import { createReader } from '@keystatic/core/reader';
import Markdoc, { type Node as MarkdocNode } from '@markdoc/markdoc';
import config from '../../keystatic.config';

export const contentReader = createReader(process.cwd(), config);
async function required<T>(entry: Promise<T | null>, key: string): Promise<T> {
  const value = await entry;
  if (!value) throw new Error(`Keystatic singleton “${key}” is missing.`);
  return value;
}
export const page = {
  home: () => required(contentReader.singletons.home.read(), 'home'),
  vinyl: () => required(contentReader.singletons.vinyl.read(), 'vinyl'),
  team: () => required(contentReader.singletons.team.read(), 'team'),
  heritage: () => required(contentReader.singletons.heritage.read(), 'heritage'),
  dome: () => required(contentReader.singletons.dome.read(), 'dome'),
  contact: () => required(contentReader.singletons.contact.read(), 'contact'),
};
export const collection = {
  festivals: () => contentReader.collections.festivals.all(),
  press: () => contentReader.collections.press.all(),
};

export function paragraphs(text = '') {
  return text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}

export type MarkdocContent = string | { node: unknown } | null | undefined;

export function renderMarkdoc(source: MarkdocContent = '') {
  if (!source) return '';
  const ast = typeof source === 'string' ? Markdoc.parse(source) : source.node as MarkdocNode;
  const content = Markdoc.transform(ast);
  return Markdoc.renderers.html(content);
}

export function publicImage(path?: string | null) {
  if (!path) return '';
  if (path.startsWith('/')) return path;
  return `/uploads/${path}`;
}
