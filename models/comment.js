const { Schema, model } = require("mongoose");

const commnetSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    blogId: { type: Schema.Types.ObjectId, ref: "blog" },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Comment = model("commnet", commnetSchema);

module.exports = Comment;
