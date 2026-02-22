const { colors, header } = require('../../utils');
const { blue } = colors;

const system = () => {
	header('MySQL Service Management (systemctl)')

	console.log('\n- Start MySQL:');
	console.log(blue('  sudo systemctl start mysql'));

	console.log('\n- Stop MySQL:');
	console.log(blue('  sudo systemctl stop mysql'));

	console.log('\n- Restart MySQL:');
	console.log(blue('  sudo systemctl restart mysql'));

	console.log('\n- Enable auto-start on boot:');
	console.log(blue('  sudo systemctl enable mysql'));

	console.log('\n- Disable auto-start on boot:');
	console.log(blue('  sudo systemctl disable mysql'));

	console.log('\n- Check service status:');
	console.log(blue('  sudo systemctl status mysql'));

	console.log('\n- Check if enabled at boot:');
	console.log(blue('  sudo systemctl is-enabled mysql'));

	console.log('\n- Reload systemd configuration:');
	console.log(blue('  sudo systemctl daemon-reload'));

	console.log('\n- View logs (journal):');
	// -u: unit (systemd unit)
	// -f: follow (real time)
	console.log(blue('  sudo journalctl -u mysql -f'));
};

module.exports = system;
