import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

/** Build an Axios instance that attaches a Clerk session token as Bearer. */
export function createApiClient(getToken: () => Promise<string | null>): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
    // Accept all 2xx status codes (including 201 from /pair/create)
    validateStatus: (s) => s >= 200 && s < 300,
  });

  client.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch {
      // Clerk not ready yet — proceed without token; protected endpoints will 401
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      // Surface a clean, human-readable error message
      const message =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        (err?.code === "ECONNABORTED" ? "Request timed out. Is the backend running?" : null) ??
        (err?.code === "ERR_NETWORK" ? "Cannot reach the backend server. Check your connection." : null) ??
        err?.message ??
        "An unexpected error occurred.";
      return Promise.reject(new Error(message));
    },
  );

  return client;
}

/** Un-authed client for public endpoints (health, landing etc.) */
export const publicClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  validateStatus: (s) => s >= 200 && s < 300,
});

publicClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.detail ??
      (err?.code === "ERR_NETWORK" ? "Cannot reach the backend server." : null) ??
      err?.message ??
      "Connection failed.";
    return Promise.reject(new Error(message));
  },
);

// ── Typed response shapes ─────────────────────────────────────────────────────

export interface PairCreateResponse {
  code: string;
  expires_in_seconds: number;
}

export interface PairStatusResponse {
  status: "pending" | "paired" | "expired" | "not_found";
}

export interface Company {
  id: string;
  name: string;
  source_type: string;
  created_at: string | null;
  last_synced_at: string | null;
}

export interface CompaniesResponse {
  companies: Company[];
}

export interface PnlResponse {
  tenant_id: string;
  company_id: string;
  from_date: string;
  to_date: string;
  revenue: number;
  other_income: number;
  total_income: number;
  cost_of_goods: number;
  direct_expenses: number;
  gross_profit: number;
  indirect_expenses: number;
  net_profit: number;
  line_items: { ledger_name: string; category: string; amount: number }[];
}

export interface CashflowMonth {
  year: number;
  month: number;
  inflow: number;
  outflow: number;
  net: number;
}

export interface CashflowResponse {
  total_inflow: number;
  total_outflow: number;
  net_cashflow: number;
  monthly: CashflowMonth[];
}

export interface ReceivableRow {
  party_name: string;
  amount: number;
  voucher_count: number;
  oldest_date: string;
  latest_date: string;
}

export interface ReceivablesResponse {
  total_outstanding: number;
  parties: ReceivableRow[];
}

export interface PayableRow {
  party_name: string;
  amount: number;
  voucher_count: number;
  oldest_date: string;
  latest_date: string;
}

export interface PayablesResponse {
  total_outstanding: number;
  parties: PayableRow[];
}

export interface Report {
  id: string;
  tenant_id: string;
  company_id: string;
  report_type: string;
  period_from: string;
  period_to: string;
  status: "queued" | "generating" | "done" | "failed";
  pdf_url: string | null;
  email_sent_at: string | null;
  created_at: string;
  error: string | null;
}

export interface ReportsListResponse {
  total: number;
  reports: Report[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  tool_calls_made?: string[];
}

export interface ChatResponse {
  reply: string;
  tool_calls_made: string[];
}

export interface ConnectorStatus {
  tenant_id: string;
  status: "ok" | "error" | "unknown";
  error_message: string | null;
  last_seen_at: string | null;
}

// ── API factory (used in hooks) ───────────────────────────────────────────────

export function buildApi(client: AxiosInstance) {
  return {
    health: () => publicClient.get<{ status: string }>("/health"),

    pair: {
      create: (tenantId: string) =>
        publicClient.post<PairCreateResponse>("/pair/create", { tenant_id: tenantId }),
      status: (code: string) =>
        publicClient.get<PairStatusResponse>(`/pair/status/${code}`),
    },

    companies: {
      list: (tenantId: string) =>
        client.get<CompaniesResponse>(`/tenants/${tenantId}/companies`),
    },

    insights: {
      pnl: (tenantId: string, companyId: string, from: string, to: string) =>
        client.get<PnlResponse>(
          `/insights/${tenantId}/companies/${companyId}/pnl?from_date=${from}&to_date=${to}`,
        ),
      cashflow: (tenantId: string, companyId: string, from: string, to: string) =>
        client.get<CashflowResponse>(
          `/insights/${tenantId}/companies/${companyId}/cashflow?from_date=${from}&to_date=${to}`,
        ),
      receivables: (tenantId: string, companyId: string, asOf: string, limit = 10) =>
        client.get<ReceivablesResponse>(
          `/insights/${tenantId}/companies/${companyId}/receivables?as_of=${asOf}&limit=${limit}`,
        ),
      payables: (tenantId: string, companyId: string, asOf: string, limit = 10) =>
        client.get<PayablesResponse>(
          `/insights/${tenantId}/companies/${companyId}/payables?as_of=${asOf}&limit=${limit}`,
        ),
    },

    reports: {
      generate: (tenantId: string, companyId: string, from: string, to: string, reportType = "weekly") =>
        client.post<Report>(`/reports/${tenantId}/companies/${companyId}/generate`, {
          from_date: from,
          to_date: to,
          report_type: reportType,
        }),
      list: (tenantId: string, companyId: string, limit = 20) =>
        client.get<ReportsListResponse>(
          `/reports/${tenantId}/companies/${companyId}?limit=${limit}`,
        ),
      get: (tenantId: string, companyId: string, reportId: string) =>
        client.get<Report>(`/reports/${tenantId}/companies/${companyId}/${reportId}`),
    },

    chat: {
      /**
       * Stream the CFO AI reply as Server-Sent Events.
       * Returns a native ReadableStream — consume with a reader loop.
       */
      stream: async (
        tenantId: string,
        companyId: string,
        messages: { role: string; content: string }[],
        getToken: () => Promise<string | null>,
      ): Promise<ReadableStream<Uint8Array>> => {
        const token = await getToken();
        const res = await fetch(
          `${BASE_URL}/chat/${tenantId}/companies/${companyId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ messages }),
          },
        );
        if (!res.ok) {
          const text = await res.text().catch(() => res.statusText);
          throw new Error(text || `Chat request failed (${res.status})`);
        }
        return res.body!;
      },
    },

    settings: {
      get: (tenantId: string) => client.get(`/settings/${tenantId}`),
      patch: (tenantId: string, data: Record<string, unknown>) =>
        client.patch(`/settings/${tenantId}`, data),
    },

    connector: {
      status: (tenantId: string) =>
        client.get<ConnectorStatus>(`/connector/status/${tenantId}`),
    },
  };
}

export type Api = ReturnType<typeof buildApi>;
