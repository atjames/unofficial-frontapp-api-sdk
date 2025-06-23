import { FrontClient } from './src';

const API_TOKEN = process.env.FRONT_API_TOKEN || '<your-token>';

async function run() {
  const front = new FrontClient(API_TOKEN);
  
  console.log('Getting account by ID...');
  const account = await front.accounts.get('acc_123');
  console.log(account);

  console.log('Listing all accounts...');
  const allAccounts = await front.accounts.listAll();
  console.log(`Retrieved ${allAccounts.length} accounts.`);

  const newAccount = await front.accounts.create({name: 'test', description: 'test'})
  console.log(`created ${newAccount}`);
}

run().catch(console.error);
