'use strict';

import BaseComponent from '../prototype/baseComponent'
import StatisModel from '../models/statis/statis'
import dtime from 'time-formater'//返回时间的格式，具体用法看npm

class Statistic extends BaseComponent {
	constructor(){
		super()
		this.apiRecord = this.apiRecord.bind(this)
	}
	async apiRecord(req, res, next){
		try{
			const statis_id = await this.getId('statis_id')//getId方法在BaseComponent中定义的
			const apiInfo = {
				date: dtime().format('YYYY-MM-DD'),
				origin: req.headers.origin,
				id: statis_id,
			}
			StatisModel.create(apiInfo)
		}catch(err){
			console.log('API记录出错', err);
		}
		next()
	}
}

export default new Statistic()
