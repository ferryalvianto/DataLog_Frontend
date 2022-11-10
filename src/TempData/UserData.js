import { v4 } from 'uuid'

export const UserData = [
	{
		Date: '2022-10-23',
		PredictedRevenue: 3456,
		Flag_latest: '1',
	},
	{
		Date: '2022-10-24',
		PredictedRevenue: 3330,
		Flag_latest: '1',
	},
	{
		Date: '2022-10-25',
		PredictedRevenue: 3456,
		Flag_latest: '1',
	},
	{
		Date: '2022-10-27',
		PredictedRevenue: 3000,
		Flag_latest: '1',
	},
];

export const businesses = [
	{
		id: v4(),
		name: 'Business Test 1',
		users: [{
			id: v4(),
			firstname: 'John',
			lastname: 'Doe',
			username: 'asdfasdf',
			password: 'asdfasdf',
			email: 'john@email.com',
			business: 'Business Test 1',
			newuser: true
		}]
	}, 
	{
		id: v4(),
		name: 'Business Test 2',
		users: [{
			id: v4(),
			firstname: 'Jane',
			lastname: 'Doe',
			username: 'asdfasdf',
			password: 'asdfasdf',
			email: 'Jane@email.com',
			business: 'Business Test 2',
			newuser: true
		}]
	}
]