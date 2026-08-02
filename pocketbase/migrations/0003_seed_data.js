migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
    } catch (_) {
      const admin = new Record(users)
      admin.setEmail('1aspiraqualquer@gmail.com')
      admin.setPassword('Skip@Pass')
      admin.setVerified(true)
      admin.set('name', 'Eco Admin ReClapp')
      admin.set('role', 'municipio_admin')
      admin.set('level', 12)
      admin.set('experience', 2850)
      admin.set('eco_points', 1450)
      admin.set('streak_days', 14)
      admin.set('city', 'São Paulo')
      admin.set('state', 'SP')
      admin.set(
        'bio',
        'Gestor ambiental e apaixonado por transformar resíduos em impacto social positivo.',
      )
      admin.set('onboarding_complete', true)
      app.save(admin)
    }

    const citiesCol = app.findCollectionByNameOrId('cities')
    const cityList = [
      { name: 'São Paulo', state: 'SP', country: 'Brasil' },
      { name: 'Rio de Janeiro', state: 'RJ', country: 'Brasil' },
      { name: 'Belo Horizonte', state: 'MG', country: 'Brasil' },
      { name: 'Curitiba', state: 'PR', country: 'Brasil' },
      { name: 'Porto Alegre', state: 'RS', country: 'Brasil' },
      { name: 'Salvador', state: 'BA', country: 'Brasil' },
      { name: 'Recife', state: 'PE', country: 'Brasil' },
      { name: 'Brasília', state: 'DF', country: 'Brasil' },
    ]
    cityList.forEach((c) => {
      try {
        app.findFirstRecordByData('cities', 'name', c.name)
      } catch (_) {
        const rec = new Record(citiesCol)
        rec.set('name', c.name)
        rec.set('state', c.state)
        rec.set('country', c.country)
        app.save(rec)
      }
    })

    const materialsCol = app.findCollectionByNameOrId('materials')
    const materialList = [
      {
        name: 'Garrafa PET',
        icon: '🧴',
        category: 'plastico',
        how_to_recycle:
          'Lave para retirar resíduos. Retire o rótulo e amasse para otimizar o volume.',
        how_to_reuse: 'Faça vasos autoirrigáveis, organizadores ou alimentadores de pássaros.',
        fun_facts: ['Demora mais de 400 anos para se decompor.'],
        environmental_impact: 'Economiza 70% de energia comparado à produção de plástico virgem.',
      },
      {
        name: 'Papel e Papelão',
        icon: '📄',
        category: 'papel',
        how_to_recycle: 'Mantenha limpo e seco. Não molhe nem engordure.',
        how_to_reuse: 'Utilize como rascunho, crie caixas organizadoras ou arte com papel machê.',
        fun_facts: ['1 tonelada de papel reciclado salva 17 árvores adultas.'],
        environmental_impact: 'Reduz o consumo de água em 50% na fabricação.',
      },
      {
        name: 'Lata de Alumínio',
        icon: '🥫',
        category: 'metal',
        how_to_recycle: 'Lave ligeiramente e dobre para não ocupar espaço.',
        how_to_reuse: 'Crie porta-lápis, lanternas decorativas ou pequenos vasos.',
        fun_facts: ['Pode ser reciclada infinitas vezes sem perder qualidade.'],
        environmental_impact:
          'Reciclar consome apenas 5% da energia usada para extrair alumínio novo.',
      },
      {
        name: 'Garrafa de Vidro',
        icon: '🫙',
        category: 'vidro',
        how_to_recycle: 'Lave bem. Se quebrar, embale em jornal ou caixa de papelão para proteção.',
        how_to_reuse: 'Transforme em garrafas decorativas, jarras de água ou luminárias.',
        fun_facts: ['O vidro é 100% reciclável e dura indefinidamente.'],
        environmental_impact: 'Evita a poluição de solos e rios por extração de areia.',
      },
      {
        name: 'Óleo de Cozinha',
        icon: '🛢️',
        category: 'oleo',
        how_to_recycle: 'Espere esfriar, armazene em garrafa PET e entregue em ecoponto.',
        how_to_reuse: 'Pode ser transformado em sabão caseiro ecológico.',
        fun_facts: ['1 litro de óleo polui 25 mil litros de água limpa.'],
        environmental_impact: 'Garante biodiesel limpo e evita o entupimento de esgotos.',
      },
      {
        name: 'Eletrônicos',
        icon: '💻',
        category: 'eletronicos',
        how_to_recycle: 'Leve a pontos de coleta específicos para lixo eletrônico.',
        how_to_reuse: 'Peças podem ser reaproveitadas em robótica educacional.',
        fun_facts: ['Contém metais preciosos como ouro, prata e cobre.'],
        environmental_impact: 'Impede o vazamento de metais pesados no solo.',
      },
    ]

    materialList.forEach((m) => {
      try {
        app.findFirstRecordByData('materials', 'name', m.name)
      } catch (_) {
        const rec = new Record(materialsCol)
        rec.set('name', m.name)
        rec.set('icon', m.icon)
        rec.set('category', m.category)
        rec.set('how_to_recycle', m.how_to_recycle)
        rec.set('how_to_reuse', m.how_to_reuse)
        rec.set('fun_facts', JSON.stringify(m.fun_facts))
        rec.set('environmental_impact', m.environmental_impact)
        app.save(rec)
      }
    })

    const challengesCol = app.findCollectionByNameOrId('challenges')
    const challengeList = [
      {
        title: 'Primeiro Passo Verde',
        description: 'Cadastre-se na plataforma e recicle 3 embalagens.',
        type: 'diario',
        difficulty: 1,
        reward_points: 50,
        active: true,
      },
      {
        title: 'Mestre do Plástico',
        description: 'Entregue 10 garrafas PET em um ecoponto credenciado.',
        type: 'semanal',
        difficulty: 2,
        reward_points: 150,
        active: true,
      },
      {
        title: 'Guardião do Óleo',
        description: 'Descarte 2 litros de óleo usado sem poluir a água.',
        type: 'mensal',
        difficulty: 3,
        reward_points: 300,
        active: true,
      },
      {
        title: 'Artista do DIY',
        description: 'Crie e publique um tutorial de reutilização criativa.',
        type: 'especial',
        difficulty: 2,
        reward_points: 200,
        active: true,
      },
    ]

    challengeList.forEach((ch) => {
      try {
        app.findFirstRecordByData('challenges', 'title', ch.title)
      } catch (_) {
        const rec = new Record(challengesCol)
        rec.set('title', ch.title)
        rec.set('description', ch.description)
        rec.set('type', ch.type)
        rec.set('difficulty', ch.difficulty)
        rec.set('reward_points', ch.reward_points)
        rec.set('active', ch.active)
        app.save(rec)
      }
    })

    const ecopontosCol = app.findCollectionByNameOrId('ecopontos')
    const ecoList = [
      {
        name: 'Ecoponto Pinheiros',
        address: 'Praça Victor Civita, Pinheiros, São Paulo - SP',
        latitude: -23.5645,
        longitude: -46.6989,
        phone: '(11) 3031-1000',
        hours: 'Segunda a Sábado: 08:00 - 18:00',
        materials_accepted: ['plastico', 'papel', 'vidro', 'metal'],
        rating: 4.8,
        status: 'approved',
      },
      {
        name: 'Ecoponto Vila Mariana',
        address: 'Rua do Projetista, 200, São Paulo - SP',
        latitude: -23.5891,
        longitude: -46.6342,
        phone: '(11) 5572-2020',
        hours: 'Segunda a Domingo: 06:00 - 22:00',
        materials_accepted: ['eletronicos', 'pilhas', 'oleo'],
        rating: 4.9,
        status: 'approved',
      },
      {
        name: 'Ponto Ecológico Botafogo',
        address: 'Rua Voluntários da Pátria, Rio de Janeiro - RJ',
        latitude: -22.9519,
        longitude: -43.1856,
        phone: '(21) 2539-4000',
        hours: 'Segunda a Sexta: 09:00 - 17:00',
        materials_accepted: ['plastico', 'vidro', 'oleo'],
        rating: 4.7,
        status: 'approved',
      },
    ]

    ecoList.forEach((eco) => {
      try {
        app.findFirstRecordByData('ecopontos', 'name', eco.name)
      } catch (_) {
        const rec = new Record(ecopontosCol)
        rec.set('name', eco.name)
        rec.set('address', eco.address)
        rec.set('latitude', eco.latitude)
        rec.set('longitude', eco.longitude)
        rec.set('phone', eco.phone)
        rec.set('hours', eco.hours)
        rec.set('materials_accepted', JSON.stringify(eco.materials_accepted))
        rec.set('rating', eco.rating)
        rec.set('status', eco.status)
        app.save(rec)
      }
    })
  },
  (app) => {},
)
