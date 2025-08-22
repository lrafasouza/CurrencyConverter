# Currency Converter

Um conversor de moedas moderno e elegante construído com Angular, oferecendo conversões em tempo real com uma interface minimalista e responsiva.

## Características

- **Design Glass Morphism** - Interface moderna com efeitos de vidro translúcido
- **Conversão Manual** - Controle total sobre quando realizar as conversões
- **Selects Customizados** - Dropdowns elegantes com bandeiras dos países
- **Responsivo** - Adapta-se perfeitamente a diferentes tamanhos de tela
- **Animações Suaves** - Transições fluidas e feedback visual intuitivo
- **Interface Minimalista** - Foco na usabilidade e experiência do usuário

## Funcionalidades

### Interface Interativa
- Input minimalista para valores monetários
- Selects customizados com bandeiras dos países
- Botão de swap animado com rotação de 180°
- Feedback visual em tempo real


### Design Responsivo
- Layout adaptativo para desktop, tablet e mobile
- Componentes que se ajustam automaticamente
- Experiência otimizada em todos os dispositivos

## Tecnologias Utilizadas

- **Angular 18+** - Framework principal
- **TypeScript** - Linguagem de programação
- **CSS3** - Estilização avançada com Glass Morphism
- **HTML5** - Estrutura semântica
- **RxJS** - Programação reativa
- **Unirate API** - API de conversão de moedas (https://api.unirateapi.com/)

## Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/lrafasouza/CurrencyConverter.git
   cd currency-converter
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   ng serve
   ```

4. **Abra no navegador**
   ```
   http://localhost:4200
   ```

##  Screenshots

### Desktop
*Interface principal em desktop com design glass morphism*

### Mobile
*Layout responsivo otimizado para dispositivos móveis*

##  Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── converter/
│   │       ├── converter.html      # Template do componente
│   │       ├── converter.css       # Estilos do conversor
│   │       └── converter.ts        # Lógica do componente
│   ├── models/
│   │   └── currency.model.ts       # Modelo de dados das moedas
│   ├── services/
│   │   └── currency-service.ts     # Serviço de conversão
│   ├── app.component.*             # Componente principal
│   └── app.config.ts               # Configuração da aplicação
└── styles.css                      # Estilos globais
```

##  Como Usar

1. **Digite o valor** que deseja converter no campo de entrada
2. **Selecione a moeda de origem** clicando no primeiro dropdown
3. **Selecione a moeda de destino** clicando no segundo dropdown
4. **Use o botão swap** para trocar as moedas rapidamente
5. **Clique em "Converter"** para obter o resultado
6. **Visualize o resultado** na seção de taxa de câmbio

## Funcionalidades Técnicas

### Componentes Principais
- **ConverterComponent** - Componente principal do conversor
- **CurrencyService** - Serviço para chamadas de API de conversão
- **Currency Model** - Interface para tipagem das moedas

### API Externa
- **Unirate API** (https://api.unirateapi.com/)
  - Conversão de moedas em tempo real
  - Lista de moedas disponíveis
  - Taxas de câmbio atualizadas

### Estados da Interface
- **Loading** - Indicador visual durante conversão
- **Empty State** - Mensagem quando não há valor inserido
- **Error Handling** - Tratamento de erros de conversão
- **Success State** - Exibição do resultado da conversão
