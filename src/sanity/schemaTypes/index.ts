import { type SchemaTypeDefinition } from 'sanity'
import Product from './product';
import C from './c';
import p from './p';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    Product,
    C,
    p
  ],
}
