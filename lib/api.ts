// Replace the existing BASE_URL and clients with a proxy-based fetch that works behind Vercel

const PROXY_BASE = "/api/proxy";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${PROXY_BASE}?path=${encodeURIComponent(path)}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

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
  has_pdf: boolean;
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

export interface ChatThreadMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  tool_calls_made: string[];
  position: number;
}

export interface ChatThread {
  id: string;
  tenant_id: string;
  company_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: ChatThreadMessage[];
}

export interface ThreadsListResponse {
  threads: ChatThread[];
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
      download: (tenantId: string, companyId: string, reportId: string) =>
        client.get<Blob>(`/reports/${tenantId}/companies/${companyId}/${reportId}/download`, {
          responseType: "blob",
        }),
      sendEmail: (tenantId: string, companyId: string, reportId: string) =>
        client.post<{ ok: boolean; to: string }>(
          `/reports/${tenantId}/companies/${companyId}/${reportId}/send-email`,
        ),
      delete: (tenantId: string, companyId: string, reportId: string) =>
        client.delete(`/reports/${tenantId}/companies/${companyId}/${reportId}`),
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

      threads: {
        list: (tenantId: string, companyId: string) =>
          client.get<ThreadsListResponse>(
            `/chat/${tenantId}/companies/${companyId}/threads`,
          ),
        get: (tenantId: string, companyId: string, threadId: string) =>
          client.get<ChatThread>(
            `/chat/${tenantId}/companies/${companyId}/threads/${threadId}`,
          ),
        save: (
          tenantId: string,
          companyId: string,
          messages: ChatMessage[],
          threadId?: string,
          title?: string,
        ) =>
          client.post<ChatThread>(
            `/chat/${tenantId}/companies/${companyId}/threads`,
            { thread_id: threadId ?? null, title: title ?? null, messages },
          ),
        delete: (tenantId: string, companyId: string, threadId: string) =>
          client.delete(
            `/chat/${tenantId}/companies/${companyId}/threads/${threadId}`,
          ),
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
