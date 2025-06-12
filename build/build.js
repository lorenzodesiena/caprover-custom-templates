const fs = require('fs');
const path = require('path');

console.log('🚀 Building CapRover One-Click Apps repository...');

// Pulisci directory docs/v4 esistente
const buildDir = 'docs';
if (fs.existsSync(`${buildDir}/v4`)) {
    fs.rmSync(`${buildDir}/v4`, { recursive: true });
    console.log('🧹 Directory docs/v4 pulita');
}

// Crea struttura docs/v4
fs.mkdirSync(`${buildDir}/v4/apps`, { recursive: true });
console.log('📁 Struttura directory creata in docs/');

// Copia template YAML
const yamlPath = 'public/v4/apps/wordpress-clients.yml';
if (fs.existsSync(yamlPath)) {
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    fs.writeFileSync(`${buildDir}/v4/apps/wordpress-clients.yml`, yamlContent);
    console.log('📄 Template YAML copiato');
}

// CORREZIONE: Crea il file list nel formato JSON che CapRover si aspetta
const oneClickApps = {
    "oneClickApps": [
        {
            "name": "wordpress-clients",
            "displayName": "WordPress Clienti (128MB Upload)",
            "description": "WordPress ottimizzato con upload 128MB, MySQL incluso, configurazioni sicurezza preimpostate",
            "isOfficial": false,
            "logoUrl": "https://s.w.org/about/images/logos/wordpress-logo-32.png"
        }
    ]
};

// Scrive il file list in formato JSON (non più solo testo)
fs.writeFileSync(`${buildDir}/v4/list`, JSON.stringify(oneClickApps));
console.log('📋 File list creato in formato JSON corretto');

// Mantieni anche apps.json per compatibilità
fs.writeFileSync(`${buildDir}/v4/apps.json`, JSON.stringify(oneClickApps, null, 2));
console.log('📊 Apps JSON creato');

console.log('\n✅ Build completato con successo!');
console.log('📁 Files generati in docs/v4/:');
console.log('   - list (formato JSON per CapRover)');
console.log('   - apps/wordpress-clients.yml');  
console.log('   - apps.json');
