export default {
    name: 'category',
    title: 'category',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'number',
        validation: (Rule:any) => Rule.required(),
      },
      {
        name: 'name',
        title: 'name',
        type: 'string',
        validation: (Rule:any) => Rule.required(),
      },
      {
        name: 'image_url',
        title: 'Image URL',
        type: 'url',
        validation: (Rule:any) => Rule.required().uri({ scheme: ['http', 'https'] }),
      },
    ],
  };
  