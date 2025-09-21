const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const DATA_DIR = path.join(__dirname, 'data');
const F_ASSETS = path.join(DATA_DIR, 'assets.json');
const F_PROFILES = path.join(DATA_DIR, 'profiles.json');
const F_RECS = path.join(DATA_DIR, 'recommendations.json');

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(F_ASSETS)) {
    fs.writeFileSync(F_ASSETS, JSON.stringify([
      { id: 'tesouro_2029', nome: 'Tesouro Prefixado 2029', classe: 'renda_fixa' },
      { id: 'cdb_liquidez', nome: 'CDB Liquidez Diária', classe: 'renda_fixa' },
      { id: 'bova11', nome: 'ETF BOVA11', classe: 'renda_variavel' },
      { id: 'itsa4', nome: 'Itaúsa PN', classe: 'renda_variavel' }
    ], null, 2));
  }
  if (!fs.existsSync(F_PROFILES)) fs.writeFileSync(F_PROFILES, '[]');
  if (!fs.existsSync(F_RECS)) fs.writeFileSync(F_RECS, '[]');
}
ensureData();

function load(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function save(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get('/health', (_req, res) => res.json({ ok: true }));

// === ASSETS ===
app.get('/assets', (_req, res) => {
  res.json(load(F_ASSETS));
});

// === PROFILES ===
app.get('/profiles', (_req, res) => {
  res.json(load(F_PROFILES));
});

app.post('/profiles', (req, res) => {
  const { suitability, objetivo, liquidez } = req.body || {};
  if (!['conservador','moderado','arrojado'].includes(suitability || '')) {
    return res.status(400).json({ error: 'suitability inválido' });
  }
  if (!['curto','medio','longo'].includes(objetivo || '')) {
    return res.status(400).json({ error: 'objetivo inválido' });
  }
  if (!['baixa','media','alta'].includes(liquidez || '')) {
    return res.status(400).json({ error: 'liquidez inválida' });
  }

  const profiles = load(F_PROFILES);
  const profile = { id: `p_${Date.now()}`, suitability, objetivo, liquidez };
  profiles.push(profile);
  save(F_PROFILES, profiles);
  res.status(201).json(profile);
});

// === RECOMMENDATIONS ===
app.post('/recommendations', (req, res) => {
  const { profileId } = req.body || {};
  const profiles = load(F_PROFILES);
  const profile = profiles.find(p => p.id === profileId);
  if (!profile) return res.status(404).json({ error: 'Profile não encontrado' });

  const assets = load(F_ASSETS);
  let selecionados;
  if (profile.suitability === 'conservador') {
    selecionados = assets.filter(a => a.classe === 'renda_fixa').slice(0, 2);
  } else if (profile.suitability === 'arrojado') {
    selecionados = assets.filter(a => a.classe === 'renda_variavel').slice(0, 2);
  } else {
    selecionados = [
      ...assets.filter(a => a.classe === 'renda_fixa').slice(0, 1),
      ...assets.filter(a => a.classe === 'renda_variavel').slice(0, 1)
    ];
  }

  const peso = selecionados.length ? 1 / selecionados.length : 0;
  const items = selecionados.map(a => ({ assetId: a.id, nome: a.nome, peso, xai: `Coerente com ${profile.suitability}` }));

  const recs = load(F_RECS);
  const rec = { id: `rec_${Date.now()}`, profileId, items, resumo: `Perfil ${profile.suitability} • Obj ${profile.objetivo} • Liq ${profile.liquidez}` };
  recs.push(rec);
  save(F_RECS, recs);
  res.status(201).json(rec);
});

// fallback de erro
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API local em http://localhost:${PORT}`));