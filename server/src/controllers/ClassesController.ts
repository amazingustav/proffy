import { Request, Response } from 'express'

import convertHourToMinutes from "../utils/convertHoursToMinutes"
import db from "../database/connection"

interface ScheduleItem {
  week_day: number,
  from: String,
  to: String
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query

    const subject = filters.subject as string
    const week_day = filters.week_day as string
    const time = filters.time as string

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinutes(time)
    
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return response.json(classes)
  }

  async create(request: Request, response: Response) {
    const {
      name, 
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body
  
    const trx = await db.transaction()
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id: insertedUsersIds[0]
      })
    
      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          class_id: insertedClassesIds[0],
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to)
        }
      })
    
      await trx('class_schedule').insert(classSchedule)
    
      await trx.commit()
    
      return response.status(201).send()
    } catch (err) {
      await trx.rollback()
  
      console.log(err)
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class: ' + err
      })
    }
  }
}