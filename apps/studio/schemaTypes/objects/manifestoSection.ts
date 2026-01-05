import { defineType } from 'sanity';

export const manifestoSection = defineType({
  name: 'manifestoSection',
  title: 'Манифест',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Включена', type: 'boolean', initialValue: true },
    {
      name: 'id',
      title: 'ID секции',
      type: 'string',
    },
    {
      name: 'theme',
      title: 'Тема',
      type: 'string',
      options: {
        list: [
          { title: 'Тёмная', value: 'dark' },
          { title: 'Светлая', value: 'light' },
        ],
      },
      initialValue: 'dark',
    },
    {
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
    },
    {
      name: 'philosophy',
      title: 'Текст манифеста',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'signature',
      title: 'Подпись',
      type: 'string',
    },
  ],
});
