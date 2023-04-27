axios.post('localhost:3000/create-class', {
    name: 'Software Engineering',
    capacity: 50,
    startDate: '2023-05-01',
    endDate: '2023-08-31'
    }, {
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGE5Nzc4MWJmYWY3NThmMTE3ZTQzNiIsImlhdCI6MTY4MjYxMDE1MH0.v9yYB2ClGY3qd57lZlMXxYS6TQrF-wD98G8YFBJyZt8"
    // Replace token with your actual JWT token
    }
    })
    .then((response) => {
    console.log(response.data);
    })
    .catch((error) => {
    console.error(error);
    });
    
    // Note: Make