const fs = require('fs');
const path = require('path');

console.log('🚀 Building CapRover One-Click Apps repository...');

// Pulisci directory docs esistente (manteniamo quella vecchia)
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

// Crea file list (richiesto da CapRover)
fs.writeFileSync(`${buildDir}/v4/list`, 'wordpress-clients\n');
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

fs.writeFileSync(`${buildDir}/v4/apps.json`, JSON.stringify(appMetadata, null, 2));
console.log('📊 Metadata JSON creato');

console.log('\n✅ Build completato con successo!');
console.log('📁 Files generati in docs/v4/:');
console.log('   - list');
console.log('   - apps/wordpress-clients.yml');  
console.log('   - apps.json');
