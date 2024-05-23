import jobModel from "../models/jobModel.js";

// create jobs
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    next("Please enter the required fields");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobModel.created(req.body);
  res.status(201).json({ job });
};

// get jobs
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totaJobs: jobs.length,
    jobs,
  });
};

// update jobs
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //validation
  if (!company || !position) {
    next("Please provide all fields");
  }

  //find jobs
  const job = await jobModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`no jobs found with is id ${id}`);
  }
  if(req.user.userId===job.createdBy.toString()){
    next("you are not authorised to update this job")
    return;
  }
  const updateJob=await jobModel.findOneAndUpdate({_id:id}, req.body, {
    new:true,
    runValidators:true
  })
  res.status(200).json({updateJob})
};
