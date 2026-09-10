/* ============================================================
   brand.js — ARQUIVO ÚNICO DE PERSONALIZAÇÃO
   ------------------------------------------------------------
   Para entregar este site a um novo cliente, edite SOMENTE
   este arquivo. Não é necessário mexer em HTML, CSS ou app.js.

   Checklist rápido:
     1. nome, tagline, contato
     2. tema (cores) e fontes
     3. serviços, equipe, depoimentos, FAQ, horários
     4. trocar as imagens em assets/ mantendo os nomes
   ============================================================ */

window.BRAND = {

  /* ---------- 1. identidade ---------- */
  nome: 'Clínica Vet Amigo',
  sigla: 'VA',                       // vai dentro do quadradinho do logo
  tagline: 'Cuidado veterinário de verdade, do filhote ao idoso',

  seo: {
    titulo: 'Clínica Vet Amigo — Veterinária 24h em Porto Alegre',
    descricao: 'Clínica veterinária com consultas, vacinação, cirurgia, exames de imagem e pronto-socorro 24 horas. Agende pelo WhatsApp.'
  },

  /* ---------- 2. cores e fontes ----------
     Qualquer chave aqui vira uma CSS var de mesmo nome.
     Trocar --primary já re-tematiza o site inteiro.        */
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
    whatsapp: '+55 51 99999-0000',   // qualquer formato: o código normaliza
    telefone: '+55 51 3333-0000',
    telefoneLabel: '(51) 3333-0000',
    whatsappLabel: '(51) 99999-0000',
    email: 'contato@vetamigo.com.br',
    endereco: 'Av. Independência, 1200 — Moinhos de Vento, Porto Alegre/RS',
    enderecoCurto: 'Moinhos de Vento, Porto Alegre',
    mensagemWhatsapp: 'Olá! Vim pelo site e gostaria de agendar uma consulta.',
    tituloMensagem: 'Novo contato pelo site'
  },

  redes: [
    { nome: 'Instagram', url: 'https://instagram.com/' },
    { nome: 'Facebook',  url: 'https://facebook.com/' }
  ],

  /* ---------- 4. rótulos de interface ---------- */
  ui: {
    pularConteudo: 'Pular para o conteúdo',
    abrirMenu: 'Abrir menu',
    fecharMenu: 'Fechar menu',
    erros: {
      obrigatorio: 'Preencha este campo para continuar.',
      telefone: 'Informe DDD e número, ex.: (51) 99999-0000.',
      email: 'Confira o e-mail, ex.: nome@dominio.com.br.',
      revisar: 'Confira os campos destacados abaixo.',
      enviadoWhatsapp: 'Abrimos o WhatsApp com a sua mensagem pronta. É só enviar.',
      enviadoEmail: 'Abrimos o seu e-mail com a mensagem pronta.'
    }
  },

  nav: {
    servicos: 'Serviços',
    equipe: 'Equipe',
    depoimentos: 'Depoimentos',
    faq: 'Dúvidas',
    contato: 'Contato',
    cta: 'Agendar consulta'
  },

  /* ---------- 5. hero ---------- */
  hero: {
    eyebrow: 'Pronto-socorro 24 horas',
    tituloHtml: 'Seu melhor amigo merece <em>o melhor cuidado</em>',
    subtitulo: 'Equipe com CRMV ativo, centro cirúrgico próprio e atendimento de urgência a qualquer hora. Agende em menos de um minuto pelo WhatsApp.',
    ctaPrimario: 'Agendar pelo WhatsApp',
    ctaSecundario: 'Ver serviços',
    selos: [
      'CRMV-RS ativo',
      'Centro cirúrgico próprio',
      'Internação monitorada'
    ],
    destaqueValor: '24h',
    destaqueLabel: 'Urgência todos os dias'
  },

  /* ---------- 6. seções ---------- */
  servicos: {
    eyebrow: 'O que fazemos',
    titulo: 'Tudo o que o seu pet precisa em um só lugar',
    subtitulo: 'Da consulta de rotina ao procedimento complexo, sem precisar encaminhar para outra clínica.',
    itens: [
      {
        icone: 'stethoscope',
        titulo: 'Consulta clínica',
        texto: 'Avaliação completa, diagnóstico e plano de tratamento explicado sem pressa.',
        bullets: ['Cães, gatos e silvestres', 'Retorno incluso em 15 dias']
      },
      {
        icone: 'syringe',
        titulo: 'Vacinação e vermífugo',
        texto: 'Protocolo montado conforme a idade, a rotina e o risco de exposição do animal.',
        bullets: ['V8, V10, antirrábica e gripe', 'Carteirinha digital']
      },
      {
        icone: 'scalpel',
        titulo: 'Cirurgia',
        texto: 'Centro cirúrgico com monitoramento anestésico e recuperação acompanhada.',
        bullets: ['Castração e tecidos moles', 'Ortopedia e emergência']
      },
      {
        icone: 'scan',
        titulo: 'Exames de imagem',
        texto: 'Raio-x digital e ultrassonografia com laudo no mesmo dia.',
        bullets: ['Raio-x e ultrassom', 'Laudo em até 4 horas']
      },
      {
        icone: 'tooth',
        titulo: 'Odontologia',
        texto: 'Limpeza, extrações e tratamento de doença periodontal.',
        bullets: ['Ultrassom dentário', 'Avaliação pré-anestésica']
      },
      {
        icone: 'heart',
        titulo: 'Internação',
        texto: 'Baias individuais com acompanhamento 24 horas e relatório diário para o tutor.',
        bullets: ['Isolamento para infectados', 'Foto e atualização todo dia']
      }
    ]
  },

  numeros: [
    { valor: '12',     label: 'anos cuidando de pets' },
    { valor: '18 mil', label: 'atendimentos realizados' },
    { valor: '4,9',    label: 'estrelas no Google' },
    { valor: '24h',    label: 'plantão de urgência' }
  ],

  equipe: {
    eyebrow: 'Quem cuida',
    titulo: 'Uma equipe que você reconhece pelo nome',
    subtitulo: 'Nada de veterinário diferente a cada visita. O seu pet é acompanhado por quem já conhece o histórico dele.',
    itens: [
      { nome: 'Dra. Marina Alves',   cargo: 'Clínica geral e felinos', registro: 'CRMV-RS 12345', foto: 'assets/equipe-1.svg' },
      { nome: 'Dr. Rafael Nunes',    cargo: 'Cirurgia e ortopedia',    registro: 'CRMV-RS 23456', foto: 'assets/equipe-2.svg' },
      { nome: 'Dra. Camila Barreto', cargo: 'Diagnóstico por imagem',  registro: 'CRMV-RS 34567', foto: 'assets/equipe-3.svg' },
      { nome: 'Dr. Tiago Moreira',   cargo: 'Emergência e internação', registro: 'CRMV-RS 45678', foto: 'assets/equipe-4.svg' }
    ]
  },

  depoimentos: {
    eyebrow: 'Tutores',
    titulo: 'O que dizem quem já passou por aqui',
    itens: [
      { texto: 'Cheguei às 2h da manhã com a Mel convulsionando. Fui atendida na hora e me explicaram cada passo. Ela está ótima hoje.', autor: 'Juliana P.', detalhe: 'tutora da Mel, border collie', inicial: 'J' },
      { texto: 'Levo os meus três gatos há seis anos. A Dra. Marina lembra do histórico de cada um sem precisar abrir o prontuário.', autor: 'André L.', detalhe: 'tutor de Nina, Tom e Frida', inicial: 'A' },
      { texto: 'A castração do Thor foi tranquila e me mandaram foto dele acordando. Isso me deixou muito mais segura.', autor: 'Patrícia M.', detalhe: 'tutora do Thor, golden', inicial: 'P' }
    ]
  },

  horarios: {
    titulo: 'Horário de atendimento',
    nota: 'Urgências são atendidas fora desses horários pelo plantão 24 horas.',
    itens: [
      { dia: 'Segunda a sexta', hora: '08h — 20h' },
      { dia: 'Sábado',          hora: '08h — 16h' },
      { dia: 'Domingo',         hora: '09h — 13h' },
      { dia: 'Feriados',        hora: 'Somente urgência' }
    ]
  },

  emergencia: {
    titulo: 'Emergência agora?',
    texto: 'Ligue antes de sair de casa. A equipe já prepara a sala enquanto você está a caminho.',
    cta: 'Ligar para o plantão'
  },

  faq: {
    eyebrow: 'Dúvidas',
    titulo: 'Perguntas que sempre recebemos',
    itens: [
      { p: 'Precisa agendar ou atendem por ordem de chegada?', r: 'Consultas de rotina são agendadas para não gerar espera. Urgências são atendidas por prioridade clínica, a qualquer hora.' },
      { p: 'Quais formas de pagamento vocês aceitam?', r: 'Dinheiro, Pix, débito e crédito em até 6x sem juros. Procedimentos cirúrgicos podem ser parcelados em mais vezes mediante avaliação.' },
      { p: 'Atendem convênio ou plano de saúde pet?', r: 'Sim, trabalhamos com os principais planos de saúde pet do estado. Traga a carteirinha e um documento do tutor.' },
      { p: 'Posso acompanhar o meu pet na internação?', r: 'Pode. Temos horário de visita diário e enviamos foto e relatório pelo WhatsApp toda manhã.' },
      { p: 'Atendem animais silvestres e exóticos?', r: 'Atendemos aves, roedores e répteis em horários específicos. Consulte pelo WhatsApp antes de vir.' }
    ]
  },

  contatoSecao: {
    eyebrow: 'Fale com a gente',
    titulo: 'Agende a consulta do seu pet',
    subtitulo: 'Responda em menos de um minuto. Retornamos no mesmo dia, em horário comercial.',
    chaves: { whatsapp: 'WhatsApp', telefone: 'Telefone', endereco: 'Endereço', email: 'E-mail' },
    form: {
      nome: 'Seu nome',
      nomeHint: 'Ex.: Maria Silva…',
      telefone: 'Telefone',
      telefoneHint: 'Ex.: (51) 99999-0000',
      pet: 'Nome do pet',
      petHint: 'Ex.: Mel…',
      tipo: 'Tipo de atendimento',
      tipos: ['Consulta de rotina', 'Vacinação', 'Cirurgia', 'Exame de imagem', 'Urgência'],
      mensagem: 'Conte o que está acontecendo',
      mensagemHint: 'Ex.: vomitando desde ontem, 4 anos, não está comendo…',
      enviar: 'Enviar pelo WhatsApp',
      nota: 'Ao enviar, abrimos o WhatsApp com a sua mensagem já escrita. Nenhum dado fica salvo no site.'
    }
  },

  rodape: {
    sobre: 'Clínica veterinária completa com pronto-socorro 24 horas, centro cirúrgico e diagnóstico por imagem.',
    aviso: 'As informações deste site não substituem a avaliação presencial de um médico veterinário.',
    colNavegacao: 'Navegação',
    colContato: 'Contato',
    colOnde: 'Onde estamos',
    direitos: 'Todos os direitos reservados.'
  }
};
