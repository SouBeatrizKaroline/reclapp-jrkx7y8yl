migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')

    const contacts = new Collection({
      name: 'contacts',
      type: 'base',
      listRule: "@request.auth.role = 'admin'",
      viewRule: "@request.auth.role = 'admin'",
      createRule: '',
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'message', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(contacts)

    const cities = new Collection({
      name: 'cities',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(cities)

    const badges = new Collection({
      name: 'badges',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          values: ['reciclagem', 'educacao', 'social', 'desafios', 'especial'],
          maxSelect: 1,
        },
        { name: 'condition_type', type: 'text' },
        { name: 'condition_value', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(badges)

    const materials = new Collection({
      name: 'materials',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          values: [
            'papel',
            'vidro',
            'metal',
            'plastico',
            'oleo',
            'eletronicos',
            'pilhas',
            'madeira',
            'tecido',
          ],
          maxSelect: 1,
        },
        { name: 'how_to_recycle', type: 'text' },
        { name: 'how_to_reuse', type: 'text' },
        { name: 'fun_facts', type: 'json' },
        { name: 'environmental_impact', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(materials)

    const challenges = new Collection({
      name: 'challenges',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: [
            'diario',
            'semanal',
            'mensal',
            'especial',
            'cidade',
            'escola',
            'empresa',
            'global',
          ],
          maxSelect: 1,
        },
        { name: 'difficulty', type: 'number' },
        { name: 'requirement_type', type: 'text' },
        { name: 'requirement_value', type: 'number' },
        { name: 'reward_points', type: 'number' },
        { name: 'reward_badge_id', type: 'relation', collectionId: badges.id, maxSelect: 1 },
        { name: 'active', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(challenges)

    const posts = new Collection({
      name: 'posts',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: '@request.auth.id = user_id',
      deleteRule: '@request.auth.id = user_id',
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'content', type: 'text', required: true },
        { name: 'image', type: 'file', maxSelect: 1 },
        {
          name: 'category',
          type: 'select',
          required: true,
          values: ['reciclagem', 'diy', 'dica', 'evento', 'campanha'],
          maxSelect: 1,
        },
        { name: 'likes_count', type: 'number' },
        { name: 'comments_count', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(posts)

    const comments = new Collection({
      name: 'comments',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: '@request.auth.id = user_id',
      deleteRule: '@request.auth.id = user_id',
      fields: [
        {
          name: 'post_id',
          type: 'relation',
          required: true,
          collectionId: posts.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'content', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(comments)

    const likes = new Collection({
      name: 'likes',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: null,
      deleteRule: '@request.auth.id = user_id',
      fields: [
        {
          name: 'post_id',
          type: 'relation',
          required: true,
          collectionId: posts.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(likes)

    const follows = new Collection({
      name: 'follows',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: null,
      deleteRule: '@request.auth.id = follower_id',
      fields: [
        {
          name: 'follower_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'following_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(follows)

    const ecopontos = new Collection({
      name: 'ecopontos',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: '@request.auth.id = added_by',
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'text', required: true },
        { name: 'latitude', type: 'number', required: true },
        { name: 'longitude', type: 'number', required: true },
        { name: 'phone', type: 'text' },
        { name: 'hours', type: 'text' },
        { name: 'materials_accepted', type: 'json', required: true },
        { name: 'rating', type: 'number' },
        { name: 'ratings_count', type: 'number' },
        {
          name: 'status',
          type: 'select',
          values: ['pending', 'approved', 'rejected'],
          maxSelect: 1,
        },
        { name: 'added_by', type: 'relation', collectionId: usersCol.id, maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(ecopontos)

    const diy_tutorials = new Collection({
      name: 'diy_tutorials',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: '@request.auth.id = user_id',
      deleteRule: '@request.auth.id = user_id',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          values: ['decoracao', 'utilitario', 'brinquedo', 'moda', 'jardim', 'outros'],
          maxSelect: 1,
        },
        { name: 'difficulty', type: 'number' },
        { name: 'time_estimate', type: 'text' },
        { name: 'materials', type: 'json' },
        { name: 'steps', type: 'json' },
        { name: 'cover_image', type: 'file', maxSelect: 1 },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
        },
        { name: 'likes_count', type: 'number' },
        { name: 'saved_count', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(diy_tutorials)

    const user_badges = new Collection({
      name: 'user_badges',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'badge_id',
          type: 'relation',
          required: true,
          collectionId: badges.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(user_badges)

    const user_challenges = new Collection({
      name: 'user_challenges',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: '@request.auth.id = user_id',
      deleteRule: null,
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        {
          name: 'challenge_id',
          type: 'relation',
          required: true,
          collectionId: challenges.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'progress', type: 'number' },
        { name: 'completed', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(user_challenges)

    const notifications = new Collection({
      name: 'notifications',
      type: 'base',
      listRule: '@request.auth.id = user_id',
      viewRule: '@request.auth.id = user_id',
      createRule: '',
      updateRule: '@request.auth.id = user_id',
      deleteRule: '@request.auth.id = user_id',
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: usersCol.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { name: 'type', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'message', type: 'text', required: true },
        { name: 'data', type: 'json' },
        { name: 'read', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(notifications)
  },
  (app) => {
    ;[
      'notifications',
      'user_challenges',
      'user_badges',
      'diy_tutorials',
      'ecopontos',
      'follows',
      'likes',
      'comments',
      'posts',
      'challenges',
      'materials',
      'badges',
      'cities',
      'contacts',
    ].forEach((name) => {
      try {
        const col = app.findCollectionByNameOrId(name)
        app.delete(col)
      } catch (_) {}
    })
  },
)
