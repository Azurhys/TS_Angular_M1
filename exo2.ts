interface Administrateur {
    nom : string,
    email : string ,
    ip : string ,
    dt_connexion : Date ,
    login : string,
    password : string
   }

   type UtilisateurAnonyme = Omit<Administrateur, 'email' | 'dt_connexion' | 'login' | 'password'> & { nom?: string } & { ip: string };

   // fix 