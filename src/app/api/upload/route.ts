import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
export const POST = async (req : Request, res : Response) => {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await (file as File).arrayBuffer());
  const filename =  (file as File).name.replaceAll(" ", "_");
  console.log(filename);
  try {
    // check if folder exists
    if(fs.existsSync(path.join(process.cwd(), "public/assets"))){
      console.log("Folder exists");
    }else{
      console.log("Folder does not exist");
      fs.mkdirSync(path.join(process.cwd(), "public/assets"));
    }
    await writeFile(
      path.join(process.cwd(), "public/assets/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};