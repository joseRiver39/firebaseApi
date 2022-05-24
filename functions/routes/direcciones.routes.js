const {Router} = require('express')
const router = Router()


const admin = require("firebase-admin")



const db = admin.firestore()

router.post('/api/direcciones', async(req, res)=>{

    try {
        await db.collection('direcciones').doc()
                 .create({nombre: req.body.nombre,
                           direccion: req.body.direccion
                        }) 
         return  res.status(204).json();                
    } catch (error) {
        return  res.status(500).json(); 
    }
});

router.get('/api/direcciones/:id', async (rep, res)=> {

    try {
        const documento = db.collection('direcciones').doc(rep.params.id);
        const items = await documento.get();
        const response = items.data();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
});

router.get('/api/direcciones', async (rep, res) =>{
 try {
     const query = db.collection('direcciones');
     const querySnapshot = await query.get()
     const docs = querySnapshot.docs;
     const  response = docs.map(doc => ({
         id: doc.id,
         nombre: doc.data().nombre,
         direccion: doc.data().direccion,
        
     }))
     return res.status(200).json(response);
 } catch (error) {
    return res.status(500).json();
 }
});

router.delete('/api/direcciones/:id', async(req, res)=>{
    try {
        const directory =  db.collection('direcciones').doc(req.params.id);
        await directory.delete()
        return res.status(200).json();
        
    } catch (error) {
        return res.status(500).json();
    }
});

router.put('/api/direcciones/:id', async(req,res)=>{
    try {
        const directory =  db.collection('direcciones').doc(req.params.id);
        await directory.update({
            nombre: req.body.nombre,
            direccion: req.body.direccion
        })
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router