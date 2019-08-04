const generateUUID = () => {
	let timestamp = Date.now()

	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
		const random = (timestamp + Math.random() * 16) % 16 | 0

		timestamp = Math.floor(timestamp / 16)

		return (character == 'x' ? random : (random & 0x3 | 0x8)).toString(16)
	})

	return uuid.replace(new RegExp('-', 'g'), '')
}

export {
	generateUUID
}