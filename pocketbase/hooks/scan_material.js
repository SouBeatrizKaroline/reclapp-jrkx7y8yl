routerAdd(
  'POST',
  '/backend/v1/scan-material',
  (e) => {
    const body = e.requestInfo().body || {}
    const description = body.description || 'Garrafa plástica transparente para água'

    const response = $ai.chat({
      model: 'fast',
      messages: [
        {
          role: 'system',
          content:
            'Você é um classificador de resíduos reciclaveis. Responda ESTRITAMENTE em formato JSON com os campos: material (nome), category (um de: plastico, vidro, papel, metal, oleo, eletronicos, pilhas, madeira, tecido), recycling_instructions (como descartar), diy_idea (uma idéia de reaproveitamento), eco_points (número entre 20 e 50).',
        },
        { role: 'user', content: 'Analise a imagem/descrição do item: ' + description },
      ],
    })

    const raw = response.choices?.[0]?.message?.content || ''
    let result = {}
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        result = {
          material: 'Embalagem PET',
          category: 'plastico',
          recycling_instructions: 'Lave e remova o rótulo antes de descartar.',
          diy_idea: 'Transforme em um vaso autoirrigável.',
          eco_points: 30,
        }
      }
    } catch (err) {
      result = {
        material: 'Resíduo Reciclável',
        category: 'plastico',
        recycling_instructions: 'Encaminhe para a coleta seletiva limpo e seco.',
        diy_idea: 'Reutilize como pote organizador.',
        eco_points: 25,
      }
    }

    return e.json(200, result)
  },
  $apis.requireAuth(),
)
