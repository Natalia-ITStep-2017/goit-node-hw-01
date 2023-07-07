import contactService from './contacts.js'
import { program } from 'commander';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const listContacts = await contactService.listContacts();
      console.table(listContacts);
      break;

    case 'get':
      const contactById = await contactService.getContactById(id);
      console.log(contactById);
      break;

    case 'add':
      const addedContact = await contactService.addContact({ name, email, phone });
      console.log(addedContact);
      break;

    case 'remove':
      const removedContact = await contactService.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
