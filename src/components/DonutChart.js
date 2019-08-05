import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { ART } from 'react-native'
import { scale } from 'react-native-size-matters'

const { Surface, Group, Shape } = ART
const width = 200
const height = 200
const path = d3.arc().outerRadius(80).padAngle(0).innerRadius(60)

const DonutChart = ({ incomesAmount, expensesAmount }) => {
	const [data, setData] = useState([])

	const sectionsAngles = d3.pie().value(({ value }) => value)(data)

	useEffect(() => {
		let balance = incomesAmount - expensesAmount

		if (balance === 0 && expensesAmount === 0) expensesAmount = 1

		setData([
			{ color: '#00C853', value: balance },
			{ color: balance >= 0 ? '#DDD' : '#D84315', value: expensesAmount }
		])
	}, [incomesAmount, expensesAmount])

	return (
		<Surface width={width} height={height}>
			<Group x={width / 2} y={height / 2}>
				{sectionsAngles.map(section => {
					return (
						<Shape
							key={section.index}
							d={path(section)}
							fill={section.data.color}
						/>
					)
				})}
			</Group>
		</Surface>
	)
}

export default DonutChart