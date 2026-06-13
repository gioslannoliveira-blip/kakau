import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  Eye,
  Hand,
  Umbrella,
  Moon,
  Wind,
  Sparkles,
  Anchor,
  Star,
  ArrowLeft,
} from "lucide-react";

const mensagens = {
  medo: {
    icone: Shield,
    titulo: "Medo",
    cor: "hsla(210, 60%, 50%, 0.08)",
    corBorda: "hsla(210, 50%, 50%, 0.15)",
    corIcone: "hsla(210, 60%, 60%, 1)",
    texto: `Ei, eu sei que agora parece assustador. E tudo bem sentir medo — isso não te faz fraca, te faz humana.

Respira fundo comigo. Devagar.

Nem tudo que parece grande e ameaçador hoje vai continuar assim amanhã. O medo aumenta as coisas, distorce os contornos. Mas você é mais forte do que ele — sempre foi.

Lembra das outras vezes em que sentiu que não ia dar conta? Olha você aqui. Você passou por cada uma delas.

E essa também vai passar. Não porque é fácil. Mas porque você consegue.`,
  },

  inseguranca: {
    icone: Star,
    titulo: "Insegurança",
    cor: "hsla(260, 40%, 50%, 0.08)",
    corBorda: "hsla(260, 40%, 50%, 0.15)",
    corIcone: "hsla(260, 50%, 60%, 1)",
    texto: `Para um segundo. Olha ao redor.

Você pode não perceber, mas tem gente que te admira de verdade. Não pelo que você finge ser — mas pelo que você é quando ninguém está olhando.

Essa voz na sua cabeça dizendo que você não é boa o suficiente? Ela mente. E mente muito bem, porque conhece todos os seus pontos fracos. Mas conhecer não significa ter razão.

Você é competente. Você é inteligente. Você é capaz. E mesmo que hoje isso pareça difícil de acreditar, não deixa de ser verdade.

Não se compare com versões idealizadas dos outros. Você está no seu próprio caminho — e ele é bonito.`,
  },

  naoBonita: {
    icone: Eye,
    titulo: "Quando achar que não é bonita",
    cor: "hsla(330, 40%, 50%, 0.08)",
    corBorda: "hsla(330, 40%, 50%, 0.15)",
    corIcone: "hsla(330, 50%, 60%, 1)",
    texto: `Eu queria que você pudesse se ver pelos meus olhos. Só por um minuto.

Porque se pudesse, entenderia que beleza não tem nada a ver com o que você vê no espelho em um dia ruim. Tem a ver com a forma como seus olhos brilham quando você fala de algo que ama. Com o jeito que você ri quando está à vontade. Com a intensidade que você carrega sem nem perceber.

A gente é muito duro consigo mesmo. Reforça defeitos que ninguém vê e ignora qualidades que todo mundo nota. Você faz isso também.

Mas deixa eu te dizer uma coisa: você é bonita. Não só por fora. Principalmente por dentro. E isso ninguém tira.`,
  },

  desespero: {
    icone: Anchor,
    titulo: "Desespero",
    cor: "hsla(190, 50%, 45%, 0.08)",
    corBorda: "hsla(190, 50%, 45%, 0.15)",
    corIcone: "hsla(190, 60%, 55%, 1)",
    texto: `Agora parece que tudo está desabando. Como se cada coisa desse errado ao mesmo tempo e não houvesse saída.

Mas respira. Só isso. Uma respiração de cada vez.

A vida tem fases difíceis. Algumas bem mais do que a gente gostaria. Mas nenhuma delas é permanente — mesmo quando parece que é.

O que está doendo hoje pode não fazer sentido amanhã. Mas o tempo tem esse jeito estranho de reorganizar as coisas dentro da gente.

Você não está sozinha nessa. E mesmo que agora não dê para enxergar o caminho, ele existe. Segura minha mão — mesmo que de longe — e vamos dar um passo de cada vez.`,
  },

  coracaoQuebrado: {
    icone: Heart,
    titulo: "Coração partido",
    cor: "hsla(0, 30%, 48%, 0.08)",
    corBorda: "hsla(0, 30%, 48%, 0.15)",
    corIcone: "hsla(0, 40%, 60%, 1)",
    texto: `Dói. Eu sei que dói. E não vou fingir que é simples, porque não é.

Sentir dor é parte de se importar. Significa que você viveu aquilo de verdade, que foi real para você. E isso tem valor — mesmo que no fim tenha machucado.

Você não precisa ser forte o tempo todo. Chora se precisar. Fica quieta se quiser. Respeita o seu tempo.

O coração tem seu próprio ritmo de cura. Mas ele cura. Sempre cura.

E quando a dor diminuir — e ela vai diminuir — você vai perceber que ficou maior, não menor. Porque cada cicatriz conta uma história de algo que você superou.`,
  },

  solidao: {
    icone: Moon,
    titulo: "Solidão",
    cor: "hsla(240, 30%, 50%, 0.08)",
    corBorda: "hsla(240, 30%, 50%, 0.15)",
    corIcone: "hsla(240, 40%, 65%, 1)",
    texto: `Solidão não é só estar sozinho fisicamente. Às vezes é estar rodeado de pessoas e ainda assim sentir que ninguém entende.

Mas quero que saiba: você não é invisível.

Tem gente que pensa em você. Que se importa. Que gostaria de estar perto agora — mesmo que isso não seja possível. E eu sou uma dessas pessoas.

Sua presença importa. Mesmo que você não veja. Mesmo que hoje pareça que ninguém nota. O mundo não seria o mesmo sem você nele.

Então segura essa ideia com carinho: você está longe de estar sozinha de verdade.`,
  },

  ansiedade: {
    icone: Wind,
    titulo: "Ansiedade",
    cor: "hsla(170, 35%, 45%, 0.08)",
    corBorda: "hsla(170, 35%, 45%, 0.15)",
    corIcone: "hsla(170, 45%, 55%, 1)",
    texto: `Seus pensamentos estão acelerados. O peito apertado. A mente indo para mil lugares ao mesmo tempo.

Para. Fecha os olhos por um instante.

A ansiedade faz a gente acreditar que precisa resolver tudo agora. Mas a verdade é que a maioria das coisas pode esperar. Nada é tão urgente quanto sua paz parece acreditar que é.

Pensa no agora. Não no que pode acontecer, não no que já passou. Agora. Nesse exato segundo, você está segura. Está respirando. Está aqui.

Você não é seus pensamentos ansiosos. Eles vêm e vão como nuvens. Você é o céu — e o céu permanece, independente das nuvens que passam.`,
  },

  naoSuficiente: {
    icone: Sparkles,
    titulo: "Quando sentir que não é suficiente",
    cor: "hsla(290, 40%, 48%, 0.08)",
    corBorda: "hsla(290, 40%, 48%, 0.15)",
    corIcone: "hsla(290, 50%, 60%, 1)",
    texto: `De onde veio essa ideia de que você precisa ser perfeita o tempo todo?

Você não precisa provar nada para ninguém. Não precisa se desdobrar, nem se anular, nem ser mais do que é. O que você já é — com suas imperfeições, seus dias ruins, suas dúvidas — já merece respeito. Já merece carinho. Já é suficiente.

As pessoas que realmente importam não estão esperando uma versão impecável de você. Elas gostam de você por inteiro — incluindo as partes que você mesma ainda não aprendeu a amar.

Você é muito mais do que suficiente. E eu espero que um dia você realmente acredite nisso.`,
  },

  desistir: {
    icone: Hand,
    titulo: "Quando quiser desistir",
    cor: "hsla(40, 50%, 48%, 0.08)",
    corBorda: "hsla(40, 50%, 48%, 0.15)",
    corIcone: "hsla(40, 60%, 58%, 1)",
    texto: `Eu sei que está pesado. Sei mesmo. E não vou dizer que é fácil, porque não seria verdade.

Mas antes de desistir, me escuta.

Você já passou por tanta coisa. Coisas que pareciam impossíveis e que, de alguma forma, você superou. Não porque teve sorte. Porque você é mais forte do que imagina.

Descansa. Dá um tempo. Mas não desiste de você. Porque você vale a pena. Porque o mundo precisa de gente como você — intensa, verdadeira, real.

Amanhã pode ser diferente. Pode ser melhor. Mas você só vai saber se estiver aqui para ver.

E eu quero que você esteja.`,
  },

  lembrete: {
    icone: Umbrella,
    titulo: "Apenas um lembrete",
    cor: "hsla(160, 35%, 45%, 0.08)",
    corBorda: "hsla(160, 35%, 45%, 0.15)",
    corIcone: "hsla(160, 45%, 55%, 1)",
    texto: `Só passando para dizer que você é incrível.

Não por nenhum motivo específico. Só porque é verdade. Porque mesmo nos dias comuns, você continua sendo alguém que vale a pena conhecer. Que vale a pena manter por perto.

Não precisa de um grande acontecimento para eu lembrar disso. Mas às vezes a gente esquece de dizer.

Então aqui está: você é importante. Você faz diferença. E espero que hoje seja um dia bom para você — ou pelo menos tranquilo.

E se não for, tudo bem também. Amanhã é outro dia.`,
  },
};

const categorias = Object.keys(mensagens);

function CategoriaCard({ chave, onClick }) {
  const Icon = mensagens[chave].icone;
  return (
    <motion.button
      onClick={() => onClick(chave)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl p-6 text-left transition-all duration-500 w-full border border-white/[0.04] hover:border-white/[0.08]"
      style={{
        background: "linear-gradient(135deg, rgba(12,12,20,0.7) 0%, rgba(8,8,16,0.85) 100%)",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: mensagens[chave].cor }}
      />

      <div className="relative z-10 flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: mensagens[chave].cor,
            border: `1px solid ${mensagens[chave].corBorda}`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: mensagens[chave].corIcone }} />
        </div>
        <span className="font-heading text-base text-white/70 group-hover:text-white/90 transition-colors">
          {mensagens[chave].titulo}
        </span>
      </div>
    </motion.button>
  );
}

function MensagemAberta({ chave, onClose }) {
  const msg = mensagens[chave];
  const Icon = msg.icone;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[55] flex items-center justify-center p-6"
      style={{
        background: "hsla(225, 25%, 3%, 0.97)",
        backdropFilter: "blur(30px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ scale: 0.9, opacity: 0, y: 20, filter: "blur(10px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-xl w-full rounded-3xl p-8 md:p-10 overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${msg.cor} 0%, rgba(10,10,18,0.95) 100%)`,
          border: `1px solid ${msg.corBorda}`,
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full"
          style={{
            background: `radial-gradient(circle, ${msg.cor.replace("0.08", "0.15")} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: msg.cor,
                border: `1px solid ${msg.corBorda}`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: msg.corIcone }} />
            </div>
            <h3 className="font-heading text-2xl font-medium text-white/90">
              {msg.titulo}
            </h3>
          </div>

          <div className="space-y-5">
            {msg.texto.split("\n\n").map((paragrafo, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="font-display text-base md:text-lg text-white/50 font-light leading-relaxed"
              >
                {paragrafo.trim()}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onClose}
          className="relative z-10 mt-8 flex items-center gap-2 text-white/30 hover:text-white/50 transition-colors font-body text-xs tracking-wider uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function SupportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [aberto, setAberto] = useState(null);

  return (
    <>
      <section className="relative py-32 px-6" ref={ref}>
        {/* Ambient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsla(220, 40%, 40%, 0.03) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-body tracking-[0.3em] uppercase text-blue-300/40 mb-4 block">
              Um lugar seguro
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mb-6">
              Se algum dia você precisar
            </h2>
            <div
              className="w-20 h-[1px] mx-auto mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsla(210, 50%, 60%, 0.5), transparent)",
              }}
            />
            <p className="text-white/25 font-body font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Mesmo quando eu não estiver por perto, quero que você tenha um
              lugar para voltar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {categorias.map((chave, i) => (
              <motion.div
                key={chave}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.6 }}
              >
                <CategoriaCard chave={chave} onClick={setAberto} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {aberto && (
          <MensagemAberta chave={aberto} onClose={() => setAberto(null)} />
        )}
      </AnimatePresence>
    </>
  );
}