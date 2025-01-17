export default {
    name: 'category',
    type: 'document',
    title: 'Category',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Category Name',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Category Image',
        options: {
          hotspot: true // Enables cropping and focal point selection
        }
      },
      {
        name:'createdAt',
        type:'date',
        title:'Category created At'
      }
    ]
  };