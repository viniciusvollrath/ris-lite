module.exports = function(server) {
    server.models.user.create([{
        username: 'doctor1',
        email: 'john@doe.com',
        password: 'doctor1',
        rank: 'doctor',
        role: ['admin']
    }, {
        username: 'admin',
        email: 'jane@doe.com',
        password: 'admin',
        rank: 'admin',
        role: ['admin']
    }, {
        username: 'assistant1',
        email: 'bob@projects.com',
        password: 'assistant1',
        rank: 'assistant',
        role: ['admin'],
        role: ['assistant']
    }], function(err, users) {
        if (err) return console.log(err);

        // Create the admin role
        server.models.Role.create({
            name: 'admin'
        }, function(err, role) {
            if (err) return console.log(err);
            console.log(role);

            // Make Bob an admin
            role.principals.create({
                principalType: server.models.RoleMapping.USER,
                principalId: users[2].id
            }, function(err, principal) {
                if (err) return console.log(err);
                console.log(principal);
            });
        });
    });

};
