migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    if (!users.fields.getByName('bio')) users.fields.add(new TextField({ name: 'bio' }))
    if (!users.fields.getByName('city')) users.fields.add(new TextField({ name: 'city' }))
    if (!users.fields.getByName('state')) users.fields.add(new TextField({ name: 'state' }))
    if (!users.fields.getByName('country')) users.fields.add(new TextField({ name: 'country' }))
    if (!users.fields.getByName('level')) users.fields.add(new NumberField({ name: 'level' }))
    if (!users.fields.getByName('experience'))
      users.fields.add(new NumberField({ name: 'experience' }))
    if (!users.fields.getByName('eco_points'))
      users.fields.add(new NumberField({ name: 'eco_points' }))
    if (!users.fields.getByName('streak_days'))
      users.fields.add(new NumberField({ name: 'streak_days' }))
    if (!users.fields.getByName('onboarding_complete'))
      users.fields.add(new BoolField({ name: 'onboarding_complete' }))
    if (!users.fields.getByName('interests')) users.fields.add(new JSONField({ name: 'interests' }))
    if (!users.fields.getByName('goal')) users.fields.add(new TextField({ name: 'goal' }))
    if (!users.fields.getByName('experience_level'))
      users.fields.add(new TextField({ name: 'experience_level' }))
    if (!users.fields.getByName('role'))
      users.fields.add(
        new SelectField({
          name: 'role',
          values: ['user', 'municipio_admin', 'empresa_admin', 'escola_admin'],
          maxSelect: 1,
        }),
      )

    users.listRule = ''
    users.viewRule = ''

    app.save(users)
  },
  (app) => {},
)
