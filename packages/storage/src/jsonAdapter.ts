import { promises as fs } from 'node:fs';
import path from 'node:path';
import { BaseJsonAdapter } from './baseJsonAdapter';

/**
 * Dateibasierter Speicher für lokale Entwicklung und Tests.
 *
 * Hinweis: Auf serverlosen Plattformen (z. B. Vercel) ist das Dateisystem
 * schreibgeschützt – dort den Blob-Adapter verwenden.
 */
export class JsonStorageAdapter extends BaseJsonAdapter {
  private readonly file: string;

  constructor(file: string) {
    super();
    this.file = file;
  }

  protected async loadRaw(): Promise<string | null> {
    try {
      return await fs.readFile(this.file, 'utf8');
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw err;
    }
  }

  protected async saveRaw(data: string): Promise<void> {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.tmp`;
    await fs.writeFile(tmp, data, 'utf8');
    await fs.rename(tmp, this.file);
  }
}
