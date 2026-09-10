/* ============================================================
   brand.js — ARQUIVO UNICO DE PERSONALIZACAO
   ------------------------------------------------------------
   Para entregar este site a um novo cliente, edite SOMENTE
   este arquivo. Nao e necessario mexer em HTML, CSS ou app.js.

   Checklist rapido:
     1. nome, tagline, contato
     2. tema (cores) e fontes
     3. servicos, equipe, depoimentos, faq, horarios
     4. trocar as imagens em assets/ mantendo os nomes
   ============================================================ */

window.BRAND = {

  /* ---------- 1. identidade ---------- */
  nome: 'Clinica Vet Amigo',
  sigla: 'VA',                       // vai dentro do quadradinho do logo
  tagline: 'Cuidado veterinario de verdade, do filhote ao idoso',

  seo: {
    titulo: 'Clinica Vet Amigo — Veterinaria 24h em Porto Alegre',
    descricao: 'Clinica veterinaria com consultas, vacinacao, cirurgia, exames de imagem e pronto-socorro 24h. Agende pelo WhatsApp.'
  },

  /* ---------- 2. cores e fontes ----------
     Qualquer chave aqui vira uma CSS var de mesmo nome.
     Trocar --primary ja re-tematiza o site inteiro.        */
  tema: {
    'primary':       '#0e7c6b',
    'primary-hover': '#0a6357',
    'primary-soft':  '#dff2ee',
    'primary-tint':  '#f2faf8',
    'accent':        '#ff7a59',
    'accent-soft':   '#ffece6'
  },
  fontes: {
    display: "'Nunito', ui-rounded, 'Segoe UI', system-ui, sans-serif",
    corpo:   "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },

  /* ---------- 3. contato ---------- */
  contato: {
    whatsapp: '+55 51 99999-0000',   // qualquer formato: o codigo limpa
    telefone: '+55 51 3333-0000',
    telefoneLabel: '(51) 3333-0000',
    whatsappLabel: '(51) 99999-0000',
    email: 'contato@vetamigo.com.br',
    endereco: 'Av. Independencia, 1200 — Moinhos de Vento, Porto Alegre/RS',
    enderecoCurto: 'Moinhos de Vento, Porto Alegre',
    mensagemWhatsapp: 'Ola! Vim pelo site e gostaria de agendar uma consulta.',
    tituloMensagem: 'Novo contato pelo site'
  },

  redes: [
    { nome: 'Instagram', url: 'https://instagram.com/' },
    { nome: 'Facebook',  url: 'https://facebook.com/' }
  ],

  /* ---------- 4. hero ---------- */
  hero: {
    eyebrow: 'Pronto-socorro 24 horas',
    tituloHtml: 'Seu melhor amigo merece <em>o melhor cuidado</em>',
    subtitulo: 'Equipe com CRMV ativo, centro cirurgico proprio e atendimento de urgencia a qualquer hora. Agende em menos de um minuto pelo WhatsApp.',
    ctaPrimario: 'Agendar pelo WhatsApp',
    ctaSecundario: 'Ver servicos',
    selos: [
      'CRMV-RS ativo',
      'Centro cirurgico proprio',
      'Internacao monitorada'
    ],
    destaqueValor: '24h',
    destaqueLabel: 'Urgencia todos os dias'
  },

  /* ---------- 5. secoes ---------- */
  servicos: {
    eyebrow: 'O que fazemos',
    titulo: 'Tudo o que seu pet precisa em um so lugar',
    subtitulo: 'Da consulta de rotina ao procedimento complexo, sem precisar encaminhar para outra clinica.',
    itens: [
      {
        icone: 'stethoscope',
        titulo: 'Consulta clinica',
        texto: 'Avaliacao completa, diagnostico e plano de tratamento explicado sem pressa.',
        bullets: ['Caes, gatos e silvestres', 'Retorno incluso em 15 dias']
      },
      {
        icone: 'syringe',
        titulo: 'Vacinacao e vermifugo',
        texto: 'Protocolo montado conforme idade, rotina e risco de exposicao do animal.',
        bullets: ['V8, V10, antirrabica, gripe', 'Carteirinha digital']
      },
      {
        icone: 'scalpel',
        titulo: 'Cirurgia',
        texto: 'Centro cirurgico com monitoramento anestesico e recuperacao acompanhada.',
        bullets: ['Castracao e tecidos moles', 'Ortopedia e emergencia']
      },
      {
        icone: 'scan',
        titulo: 'Exames de imagem',
        texto: 'Raio-x digital e ultrassonografia com laudo no mesmo dia.',
        bullets: ['Raio-x e ultrassom', 'Laudo em ate 4 horas']
      },
      {
        icone: 'tooth',
        titulo: 'Odontologia',
        texto: 'Limpeza, extracoes e tratamento de doenca periodontal.',
        bullets: ['Ultrassom dentario', 'Avaliacao pre-anestesica']
      },
      {
        icone: 'heart',
        titulo: 'Internacao',
        texto: 'Baias individuais com acompanhamento 24h e relatorio diario para o tutor.',
        bullets: ['Isolamento para infectados', 'Foto e update todo dia']
      }
    ]
  },

  numeros: [
    { valor: '12',     label: 'anos cuidando de pets' },
    { valor: '18 mil', label: 'atendimentos realizados' },
    { valor: '4,9',    label: 'estrelas no Google' },
    { valor: '24h',    label: 'plantao de urgencia' }
  ],

  equipe: {
    eyebrow: 'Quem cuida',
    titulo: 'Uma equipe que voce reconhece pelo nome',
    subtitulo: 'Nada de veterinario diferente a cada visita. Seu pet e acompanhado por quem ja conhece o historico dele.',
    itens: [
      { nome: 'Dra. Marina Alves',   cargo: 'Clinica geral e felinos', registro: 'CRMV-RS 12345', foto: 'assets/equipe-1.svg' },
      { nome: 'Dr. Rafael Nunes',    cargo: 'Cirurgia e ortopedia',    registro: 'CRMV-RS 23456', foto: 'assets/equipe-2.svg' },
      { nome: 'Dra. Camila Barreto', cargo: 'Diagnostico por imagem',  registro: 'CRMV-RS 34567', foto: 'assets/equipe-3.svg' },
      { nome: 'Dr. Tiago Moreira',   cargo: 'Emergencia e internacao', registro: 'CRMV-RS 45678', foto: 'assets/equipe-4.svg' }
    ]
  },

  depoimentos: {
    eyebrow: 'Tutores',
    titulo: 'O que dizem quem ja passou por aqui',
    itens: [
      { texto: 'Cheguei as 2h da manha com a Mel convulsionando. Fui atendida na hora e me explicaram cada passo. Ela esta otima hoje.', autor: 'Juliana P.', detalhe: 'tutora da Mel, border collie', inicial: 'J' },
      { texto: 'Levo meus tres gatos ha seis anos. A Dra. Marina lembra do historico de cada um sem precisar abrir o prontuario.', autor: 'Andre L.', detalhe: 'tutor de Nina, Tom e Frida', inicial: 'A' },
      { texto: 'A castracao do Thor foi tranquila e me mandaram foto dele acordando. Isso me deixou muito mais segura.', autor: 'Patricia M.', detalhe: 'tutora do Thor, golden', inicial: 'P' }
    ]
  },

  horarios: {
    titulo: 'Horario de atendimento',
    nota: 'Urgencias sao atendidas fora desses horarios pelo plantao 24h.',
    itens: [
      { dia: 'Segunda a sexta', hora: '08h — 20h' },
      { dia: 'Sabado',          hora: '08h — 16h' },
      { dia: 'Domingo',         hora: '09h — 13h' },
      { dia: 'Feriados',        hora: 'Somente urgencia' }
    ]
  },

  emergencia: {
    titulo: 'Emergencia agora?',
    texto: 'Ligue antes de sair de casa. A equipe ja prepara a sala enquanto voce esta a caminho.',
    cta: 'Ligar para o plantao'
  },

  faq: {
    eyebrow: 'Duvidas',
    titulo: 'Perguntas que sempre recebemos',
    itens: [
      { p: 'Precisa agendar ou atendem por ordem de chegada?', r: 'Consultas de rotina sao agendadas para nao gerar espera. Urgencias sao atendidas por prioridade clinica, a qualquer hora.' },
      { p: 'Quais formas de pagamento voces aceitam?', r: 'Dinheiro, Pix, debito e credito em ate 6x sem juros. Procedimentos cirurgicos podem ser parcelados em mais vezes mediante avaliacao.' },
      { p: 'Atendem convenio ou plano de saude pet?', r: 'Sim, trabalhamos com os principais planos de saude pet do estado. Traga a carteirinha e um documento do tutor.' },
      { p: 'Posso acompanhar meu pet na internacao?', r: 'Pode. Temos horario de visita diario e enviamos foto e relatorio pelo WhatsApp toda manha.' },
      { p: 'Atendem animais silvestres e exoticos?', r: 'Atendemos aves, roedores e repteis em horarios especificos. Consulte pelo WhatsApp antes de vir.' }
    ]
  },

  contatoSecao: {
    eyebrow: 'Fale com a gente',
    titulo: 'Agende a consulta do seu pet',
    subtitulo: 'Responda em menos de um minuto. Retornamos no mesmo dia, em horario comercial.'
  },

  rodape: {
    sobre: 'Clinica veterinaria completa com pronto-socorro 24h, centro cirurgico e diagnostico por imagem.',
    aviso: 'As informacoes deste site nao substituem a avaliacao presencial de um medico veterinario.'
  }
};
