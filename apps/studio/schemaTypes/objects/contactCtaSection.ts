import { defineType } from 'sanity';

export const contactCtaSection = defineType({
  name: 'contactCtaSection',
  title: 'Контактный CTA',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Включена', type: 'boolean', initialValue: true },
    { name: 'id', title: 'ID секции', type: 'string' },
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
    { name: 'heading', title: 'Заголовок', type: 'string' },
    { name: 'body', title: 'Текст', type: 'text' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'telegram', title: 'Telegram', type: 'string' },
  ],
});
