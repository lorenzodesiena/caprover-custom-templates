const fs = require('fs');
const path = require('path');

console.log('🚀 Building CapRover One-Click Apps repository...');

// Pulisci directory dist esistente
if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('🧹 Directory dist pulita');
}

// Crea struttura dist
fs.mkdirSync('dist/v4/apps', { recursive: true });
console.log('📁 Struttura directory creata');

// Copia template YAML (lo creeremo nel prossimo step)
const yamlPath = 'public/v4/apps/wordpress-clients.yml';
if (fs.existsSync(yamlPath)) {
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    fs.writeFileSync('dist/v4/apps/wordpress-clients.yml', yamlContent);
    console.log('📄 Template YAML copiato');
} else {
    console.log('⚠️  Template YAML non trovato - lo creeremo nel prossimo step');
}

// Crea file list (richiesto da CapRover)
fs.writeFileSync('dist/v4/list', 'wordpress-clients\n');
console.log('📋 File list creato');

// Crea metadata JSON per le app
const appMetadata = {
    "wordpress-clients": {
        "name": "wordpress-clients",
        "displayName": "WordPress Clienti (128MB Upload)",
        "description": "WordPress ottimizzato con upload 128MB, MySQL incluso, configurazioni sicurezza preimpostate",
        "logoUrl": "https://s.w.org/about/images/logos/wordpress-logo-32.png",
        "isOfficial": false
    }
};

fs.writeFileSync('dist/v4/apps.json', JSON.stringify(appMetadata, null, 2));
console.log('📊 Metadata JSON creato');

// Crea CNAME per GitHub Pages (opzionale)
fs.writeFileSync('dist/CNAME', 'caprover-apps.lorenzodesiena.dev');
console.log('🌐 CNAME creato');

console.log('\n✅ Build completato con successo!');
console.log('📁 Files generati in dist/:');
console.log('   - v4/list');
console.log('   - v4/apps/wordpress-clients.yml');  
console.log('   - v4/apps.json');
console.log('   - CNAME');
