routerAdd(
  'POST',
  '/backend/v1/eco-assistant',
  (e) => {
    const body = e.requestInfo().body || {}
    const query = body.prompt || body.query
    if (!query) return e.badRequestError('Prompt ou pergunta não informada.')

    const response = $ai.chat({
      model: 'fast',
      messages: [
        {
          role: 'system',
          content:
            'Você é o ReClapp EcoBot, um especialista amigável em reciclagem, sustentabilidade e reaproveitamento de materiais. Responda em português de forma clara, prática e encorajadora em até 3 parágrafos curtos.',
        },
        { role: 'user', content: query },
      ],
    })

    const content =
      response.choices?.[0]?.message?.content ||
      'Desculpe, não consegui processar a orientação ecológica no momento.'
    return e.json(200, { answer: content })
  },
  $apis.requireAuth(),
)
