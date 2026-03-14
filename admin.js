const supabaseUrl = 'https://xygxdiqsaozmlpcshxgz.supabase.co';
const supabaseKey = 'sb_publishable_qGTgk2PSC-RFtFGPkBovsg_ClkMpoJW';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loginAdmin() {
    const pin = document.getElementById('admin-pin-input').value;
    if(pin === "1234") { // Default PIN
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
    } else {
        alert("Wrong PIN!");
    }
}

async function addTool() {
    const name = document.getElementById('tool-name').value;
    const url = document.getElementById('tool-url').value;
    const logo = document.getElementById('tool-logo').value;

    await supabase.from('tools').insert([{ tool_name: name, tool_url: url, tool_logo_url: logo }]);
    alert("Tool Added!");
}

async function saveIdentity() {
    const name = document.getElementById('set-site-name').value;
    const logo = document.getElementById('set-logo-url').value;
    await supabase.from('site_settings').update({ website_name: name, logo_url: logo }).eq('id', 1);
    alert("Settings Saved!");
}
