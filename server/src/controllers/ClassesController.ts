import { Request, Response } from 'express'

import convertHourToMinutes from "../utils/convertHoursToMinutes"
import db from "../database/connection"

interface ScheduleItem {
  week_day: number,
  from: String,
  to: String
}

export default class ClassesController {
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