# DATA ENTRY

Only data prompter

## MIGRATION

```bash
npx prisma migrate dev --name <<name-of-migration>>
```

## ABOUT THIS PROJECT

This project is for saving data, with a authenticated user/admin can be possible save data for a bussines propose:

- Email accounts and passwords
- X accounts and passowords
- Api information from X platform
  
## User / Admin SCOPE

Each User/Admin can save, update and delete his own inputs. This inputs it's bounded to validations, only valid data can be registered.
The "Admin" role is limited only at this actions, they can't create, update or delete another "User/Admin" account, only the **Super-Admin** can reach to this actions.

## Project Architecture

Use a structure of simple class and static methods for a more better maintenance and readability.