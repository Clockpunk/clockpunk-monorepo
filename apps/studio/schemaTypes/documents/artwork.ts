import { defineType } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Работы',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'Черновик', value: 'draft' },
          { title: 'Доступно', value: 'available' },
          { title: 'Продано', value: 'sold' },
          { title: 'В архиве', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Год создания',
      type: 'number',
      validation: (Rule) => Rule.required().min(2020).max(new Date().getFullYear() + 1),
    },
    {
      name: 'medium',
      title: 'Техника/Материалы',
      type: 'string',
      description: 'Например: Сталь, механические детали, часовые механизмы',
    },
    {
      name: 'dimensions',
      title: 'Размеры',
      type: 'string',
      description: 'Например: 438 мм × 360 мм',
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
    {
      name: 'price',
      title: 'Цена',
      type: 'number',
    },
    {
      name: 'currency',
      title: 'Валюта',
      type: 'string',
      options: {
        list: [
          { title: 'RUB', value: 'RUB' },
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
        ],
      },
      initialValue: 'RUB',
    },
    {
      name: 'priceOnRequest',
      title: 'Цена по запросу',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Альтернативный текст',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Галерея изображений',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Альтернативный текст',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Подпись',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'featured',
      title: 'Избранная работа',
      type: 'boolean',
      initialValue: false,
      description: 'Показывать в избранных работах на главной странице',
    },
    {
      name: 'sortOrder',
      title: 'Порядок сортировки',
      type: 'number',
      description: 'Чем меньше число, тем выше в списке (опционально)',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'OG изображение',
          type: 'image',
        },
        {
          name: 'noindex',
          title: 'Запретить индексацию',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      status: 'status',
      year: 'year',
    },
    prepare(selection) {
      const { title, media, status, year } = selection;
      const statusLabel =
        status === 'draft'
          ? 'Черновик'
          : status === 'available'
            ? 'Доступно'
            : status === 'sold'
              ? 'Продано'
              : 'Архив';
      return {
        title: title,
        subtitle: `${year} • ${statusLabel}`,
        media,
      };
    },
  },
});
