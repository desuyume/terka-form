import { z } from 'zod';

import { ERROR_MESSAGES } from '@constants/error';

export enum EventModerationStatusEnum {
  MODERATION = 'MODERATION',
  APROOVED = 'APROOVED',
  REJECTED = 'REJECTED',
}

export type EventType = {
  id: string;
  name: string;
};

export type EventsLink = {
  name: string;
  link: string;
};

export type EventData = {
  title: string;
  organizer: string;
  text: string;
  address: string;
  meetingAt: string;
  time: string;
  status: EventModerationStatusEnum;
  registrationLink?: string;
  eventLink: string;
  eventType: EventType[];
  eventStatusId: string;
  eventsLink: EventsLink[];
  cost: number;
  isFree: boolean;
};

const URL_REG_EXP =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const TG_REG_EXP = /^(?!.*__.*)(?!_)(?!.*_$)[a-zA-Z0-9_]{5,32}$/;
const MOBILE_REG_EXP = /^(?:\+7|8)\d{10}$/;

export const EventSchema = z
  .object({
    title: z
      .string()
      .min(1, ERROR_MESSAGES.REQUIRED_ERROR)
      .max(80, 'Заголовок не более 80 символов'),
    organizer: z.string().min(1, ERROR_MESSAGES.REQUIRED_ERROR),
    text: z
      .string()
      .min(1, ERROR_MESSAGES.REQUIRED_ERROR)
      .max(350, 'Описание не более 350 символов'),
    address: z.string().min(1, ERROR_MESSAGES.REQUIRED_ERROR),
    meetingAt: z.string().min(1, ERROR_MESSAGES.REQUIRED_ERROR),
    time: z.string().min(1, ERROR_MESSAGES.REQUIRED_ERROR),
    status: z.string(),
    registrationLink: z
      .string()
      .refine((value) => {
        if (!value) return true;
        return z.string().regex(URL_REG_EXP).safeParse(value).success;
      }, 'Некорректный адрес')
      .optional(),
    eventLink: z
      .string()
      .refine((value) => {
        if (!value) return true;
        return z.string().regex(URL_REG_EXP).safeParse(value).success;
      }, 'Некорректный адрес')
      .optional(),
    eventType: z
      .array(z.object({ id: z.string(), name: z.string() }))
      .min(1, ERROR_MESSAGES.REQUIRED_ERROR),
    eventStatusId: z.string(),
    eventsLink: z.array(
      z.object({
        name: z.string(),
        link: z.string(),
      }),
    ),
    cost: z.number().optional(),
    isFree: z.boolean(),
  })
  .superRefine((schema, ctx) => {
    if (!schema.isFree && (schema.cost === undefined || schema.cost <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Стоимость мероприятия должна быть больше 0',
        path: ['cost'],
      });
    }
  });

export type EventSchemaProps = z.infer<typeof EventSchema>;

export const EventCreatorContactsSchema = z.object({
  creatorTg: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_ERROR)
    .regex(TG_REG_EXP, 'Некорректный telegram'),
  creatorMobile: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_ERROR)
    .regex(MOBILE_REG_EXP, 'Некорректный номер телефона'),
});

export type EventCreatorContactsSchemaProps = z.infer<
  typeof EventCreatorContactsSchema
>;
