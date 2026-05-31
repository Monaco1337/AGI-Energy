import { get, put } from '@vercel/blob';
import { BaseJsonAdapter } from './baseJsonAdapter';

export interface BlobAdapterOptions {
  /** Pfad des JSON-Dokuments im Blob-Store. */
  pathname?: string;
  /** Statisches Read-Write-Token. Default: process.env.BLOB_READ_WRITE_TOKEN. */
  token?: string;
}

/**
 * Speicher-Backend auf Basis von Vercel Blob (privater Store).
 *
 * Die gesamte Datenbank wird als ein privates JSON-Dokument abgelegt. Das
 * funktioniert auf serverlosen Plattformen, wo das Dateisystem nur lesbar ist.
 *
 * Hinweis: Schreibvorgänge sind „last-write-wins". Für das aktuelle
 * Lead-Volumen ist das unkritisch; bei stark parallelen Writes wäre ein
 * relationales Backend (Supabase) vorzuziehen.
 */
export class BlobStorageAdapter extends BaseJsonAdapter {
  private readonly pathname: string;
  private readonly token?: string;

  constructor(opts: BlobAdapterOptions = {}) {
    super();
    this.pathname = opts.pathname ?? 'db/agi-energy.json';
    this.token = opts.token;
  }

  private tokenOpt(): { token?: string } {
    return this.token ? { token: this.token } : {};
  }

  protected async loadRaw(): Promise<string | null> {
    const res = await get(this.pathname, {
      access: 'private',
      // Immer frisch von der Quelle lesen – wir wollen nach Writes keine
      // gecachte (veraltete) Version der DB sehen.
      useCache: false,
      ...this.tokenOpt(),
    });
    if (!res || res.statusCode !== 200) return null;
    return await new Response(res.stream).text();
  }

  protected async saveRaw(data: string): Promise<void> {
    await put(this.pathname, data, {
      access: 'private',
      contentType: 'application/json',
      allowOverwrite: true,
      addRandomSuffix: false,
      ...this.tokenOpt(),
    });
  }
}
