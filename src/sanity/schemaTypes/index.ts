import { type SchemaTypeDefinition } from 'sanity'
import Product from './product';
import C from './c';
import p from './p';
import V1_Cat from './v1_category'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    Product,
    C,
    p,
    V1_Cat
  ],
}
