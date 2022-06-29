import {
  writeBatch,
  serverTimestamp,
  collection,
  doc,
} from "firebase/firestore";
import { tz } from "moment-timezone";

// postDocument
import { postNewDocument } from "../post/postDocument";

export default async function postDocumentSetupOnSignUp(
  user: any,
  userObject: {
    firstName: string;
    lastName: string;
    createdUserEmail: string | null;
    createdUidUser: string;
  }
) {
  const { createdUserEmail, firstName, lastName, createdUidUser } = userObject;

  // const batch = writeBatch(db);
  try {
    await postNewDocument({
      collectionSelected: "users",
      documentName: createdUidUser,
      inputObject: {
        emailIsVerified: false,
        email: createdUserEmail,
        firstName,
        lastName,
      },
    });

    let collectionSelectedPath = "workspaces";

    ////////////

    // create first workspace

    const browserDate = tz.guess(); //timezone
    const createdWorkSpace = await postNewDocument({
      collectionSelected: "workspaces",
      inputObject: {
        name: `${firstName} First Workspace`,
        photoURL: null,
        identified: "MFW",
        labels: [
          { name: "Feature", icon: "purpleDot" },
          { name: "Improvement", icon: "blueDot" },
          { name: "Bug", icon: "redDot" },
        ],
        timezone: browserDate,
        workspaceURL: "myfirst",
        membersId: {
          [user.uid]: { role: "Owner", invitedAt: serverTimestamp() },
        },
      },
      useAddDocument: true,
    }); //  setDoc does not return the doc only the addDoc

    // // create first team

    collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`;

    const createdTeam = await postNewDocument({
      collectionSelected: collectionSelectedPath,
      inputObject: {
        issuesNumber: 1,
        membersId: {
          [user.uid]: { role: "Owner", invitedAt: serverTimestamp() },
        },

        name: `${firstName} First Team`,
        photoURL: null,
        identified: "MFT",
        timezone: browserDate,
      },
      useAddDocument: true,
    });

    collectionSelectedPath += `/${createdTeam.id}/issues`;
    // create first Issue

    const createdIssue = await postNewDocument({
      collectionSelected: collectionSelectedPath,
      inputObject: {
        title: "Wellcome to reduce issues",
        content: {
          pictureListURL: [], // here are the urls that are gonna be stored in firebase ,
          text: "Fell free to explore the app",
        },
        status: { name: "Backlog", icon: "backlog" },
        priority: { name: "Low", icon: "priorityLow" },
        label: null,
        dueDate: null,
        blockByIssueId: "",
        blockingIssueId: "",
        identifiedNumber: 0,
        assignedToUserId: user.uid,

        updatedAt: serverTimestamp(),
        activity: [
          {
            type: "created",

            creatorId: null, // if no id then the app has created the issue
            registeredAt: new Date(),
          },
        ],
      },
      useAddDocument: true,
    }); //  setDoc does not return the doc only the addDoc

    collectionSelectedPath += `/${createdIssue.id}/activites`;

    // bind team and workspace  to the owner

    await postNewDocument({
      collectionSelected: "users",
      documentName: user.uid,
      inputObject: {
        photoURL: user.photoURL,

        workSpaces: { [createdWorkSpace.id]: { role: "Owner" } },
        workSpaceSelected: { id: createdWorkSpace.id }, // maybe add this one too later : tabSelected:{name:'my-issues'}
      },
    });

    //// create second team in first workspace -->

    collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`;

    const secondCreatedTeam = await postNewDocument({
      collectionSelected: collectionSelectedPath,
      inputObject: {
        issuesNumber: 1,
        membersId: {
          [user.uid]: { role: "Owner", invitedAt: serverTimestamp() },
        },
        assignedIssues: 1,
        name: `${firstName} Second Team`,
        photoURL: null,
        identified: "MST",
        timezone: browserDate,
      },
      useAddDocument: true,
    });

    collectionSelectedPath += `/${secondCreatedTeam.id}/issues`;

    const createdIssueToSecondTeam = await postNewDocument({
      collectionSelected: collectionSelectedPath,
      inputObject: {
        title: "Wellcome , this is your second team",
        content: {
          pictureListURL: [], // here are the urls that are gonna be stored in firebase ,
          text: "Fell free to explore the app",
        },
        status: { name: "Backlog", icon: "backlog" },
        priority: { name: "Low", icon: "priorityLow" },
        label: null,
        dueDate: null,
        blockByIssueId: "",
        blockingIssueId: "",
        identifiedNumber: 0,
        assignedToUserId: user.uid,

        updatedAt: serverTimestamp(),
        activity: [
          {
            type: "created", // may be change
            registeredAt: new Date(),
            creatorId: null,
          },
        ],
      },
      useAddDocument: true,
    });

    collectionSelectedPath += `/${createdIssueToSecondTeam.id}/activites`;

    const createdWorkSpaceSec = await postNewDocument({
      collectionSelected: "workspaces",
      inputObject: {
        name: `${firstName} Second Workspace`,
        photoURL: null,
        identified: "MSW",
        labels: [
          { name: "Feature", icon: "labelFeature" },
          { name: "Improvement", icon: "labelImprovement" },
          { name: "Bug", icon: "labelBug" },
        ],
        timezone: browserDate,
        workspaceURL: "mysecond",
        membersId: {
          [user.uid]: { role: "Owner", invitedAt: serverTimestamp() },
        },
      },
      useAddDocument: true,
    });

    collectionSelectedPath = `workspaces/${createdWorkSpaceSec.id}/teams`;

    const createdTeamSec = await postNewDocument({
      collectionSelected: collectionSelectedPath,
      inputObject: {
        issuesNumber: 1,
        membersId: {
          [user.uid]: { role: "Owner", invitedAt: serverTimestamp() },
        },
        assignedIssues: 1,
        name: `${firstName} Second Team`,
        photoURL: null,
        identified: "MST",
        timezone: browserDate,
      },
      useAddDocument: true,
    });

    collectionSelectedPath += `/${createdTeamSec.id}/issues`;

    const createdIssueSec = await postNewDocument({
      collectionSelected: collectionSelectedPath,
      inputObject: {
        title: "Wellcome to reduce issues again",
        content: {
          pictureListURL: [], // here are the urls that are gonna be stored in firebase ,
          text: "Fell free to explore the app,..again :)",
        },
        status: { name: "Backlog", icon: "backlog" },
        priority: { name: "Low", icon: "priorityLow" },
        label: null,
        dueDate: null,
        blockByIssueId: "",
        blockingIssueId: "",
        identifiedNumber: 0,
        assignedToUserId: user.uid,

        updatedAt: serverTimestamp(),
        activity: [
          {
            type: "created",
            registeredAt: new Date(),

            creatorId: null,
          },
        ],
      },
      useAddDocument: true,
    });

    collectionSelectedPath += `/${createdIssueSec.id}/activites`;

    await postNewDocument({
      collectionSelected: "users",
      documentName: user.uid,
      inputObject: {
        workSpaces: { [createdWorkSpaceSec.id]: { role: "Owner" } },
      },
    });
  } catch (e: any) {
    console.log("my error ", e.message);
  }
}
