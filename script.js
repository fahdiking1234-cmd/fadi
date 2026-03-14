const supabaseUrl = 'https://xygxdiqsaozmlpcshxgz.supabase.co';
const supabaseKey = 'sb_publishable_qGTgk2PSC-RFtFGPkBovsg_ClkMpoJW';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function initSite() {
    const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    
    if (settings) {
        document.getElementById('site-name').innerText = settings.website_name;
        if(settings.logo_url) {
            document.getElementById('site-logo').src = settings.logo_url;
            document.getElementById('site-logo').classList.remove('hidden');
        }
        if(settings.is_locked) {
            document.getElementById('lock-screen').classList.remove('hidden');
        }
    }
    loadTools();
}

async function loadTools() {
    const { data: tools } = await supabase.from('tools').select('*');
    const grid = document.getElementById('tools-grid');
    grid.innerHTML = tools.map(tool => `
        <a href="${tool.tool_url}" target="_blank" class="bg-gray-800 p-4 rounded-xl text-center hover:scale-105 transition">
            <img src="${tool.tool_logo_url}" class="w-16 h-16 mx-auto mb-2 rounded-lg">
            <p class="font-bold">${tool.tool_name}</p>
        </a>
    `).join('');
}

function unlockSystem() {
    const pin = document.getElementById('unlock-pin').value;
    // Database se pin check karne ka logic yahan ayega
    if(pin === "1234") document.getElementById('lock-screen').classList.add('hidden');
}

initSite();
