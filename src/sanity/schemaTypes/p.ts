export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule:any) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule:any) => Rule.required().min(0),
      },
      {
        name: 'discountPercentage',
        title: 'Discount Percentage',
        type: 'number',
        validation: (Rule:any) => Rule.min(0).max(100),
      },
      {
        name: 'priceWithoutDiscount',
        title: 'Price Without Discount',
        type: 'number',
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: (Rule:any) => Rule.min(0).max(5),
      },
      {
        name: 'ratingCount',
        title: 'Rating Count',
        type: 'number',
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'sizes',
        title: 'Sizes',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule:any) => Rule.required(),
      },
    ],
  };
  