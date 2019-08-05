import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { ART } from 'react-native'

const { Surface, Group, Shape } = ART
const width = 250
const height = 250
const path = d3.arc().outerRadius(100).padAngle(0).innerRadius(80)

const DonutChart = ({ incomesAmount, expensesAmount }) => {
	const [data, setData] = useState([])

	const sectionsAngles = d3.pie().value(({ value }) => value)(data)

	useEffect(() => {
		const balance = incomesAmount - expensesAmount

		setData([
			{ color: '#00C853', value: balance },
			{ color: balance > 0 ? '#DDD' : '#D84315', value: expensesAmount }
		])

	}, [incomesAmount, expensesAmount])

	return (
		<Surface width={width} height={height}>
			<Group x={width / 2} y={height / 2}>
				{sectionsAngles.map(section => {
					console.log(section)
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