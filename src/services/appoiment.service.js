const { Appointment } = require("../models/appointment.model");

const create = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const appointment = new Appointment(data);
      appointment.save();
      resolve({
        status: "Success",
        data: appointment,
        message: "Appointment created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      Promise.all([
        Appointment.find().skip(skip).limit(limit),
        Appointment.countDocuments(),
      ]).then(([appointments, total]) => {
        resolve({
          status: "Success",
          data: appointments,
          pagination:{
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          message: `Get all appointments successfully, page: ${page}, limit: ${limit}`,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
        const appointment = Appointment.findById(id);
        if(!appointment){
            reject({status: "Error", message: "Appointment not found"});
        }
        resolve({
            status: "Success",
            data: appointment,
            message: "Appointment found success"
        })
        }catch(e){
            reject(e);
        }
    })
}

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const appointment = Appointment.findByIdAndUpdate(id, data,{ new: true });
            appointment.save();
            resolve({
                status: "Success",
                data: appointment,
                message: "Appointment updated successfully"
            });
        }catch(e){
            reject(e);
        }
    })
}
const deleteById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            Appointment.findByIdAndDelete(id);
            resolve({
                status: "Success",
                message: "Appointment deleted successfully"
            });
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById,
}