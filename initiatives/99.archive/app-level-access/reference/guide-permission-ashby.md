---
title: User Permissions
slug: user-permissions
createdAt: 2025-07-10T11:57:32.686Z
updatedAt: 2025-12-19T17:03:28.916Z
---

This guide covers the different global access roles you can grant in Ashby, along with providing access to specific jobs and creating your own custom permission roles.

## Permissions Overview

Ashby supports three Global User Roles, or permission groups, that apply to your entire organization:

- Limited Access (assigned to users by default)
- Elevated Access (where access roles for jobs, departments and locations are specifically assigned)
- Organization Admin

## Permission Types

:::hint{type="info"}
This section covers global user roles and job/team/location access roles for users in the Employees section of your Ashby account. For your external recruiting partners, check out [**Agencies Users**](docId\:sMNQ8t0NuSBVnjbYJy0rS)&#x20;
:::

### Limited Access

Limited Access is the default permission option. These users can see information related to the specific interviews they are associated with. They cannot access candidate profiles, the candidate pipeline, jobs, sequences, or reports but will be able to view candidate resumes as part of the interview briefing.

::loom[]{url="https://www.loom.com/embed/09de11064aa04b55808f8fb9e60d02a5"}

This permission set is best suited for your users who only log into Ashby to submit interview feedback and referrals. Share the [**Getting Started for Interviewers**](docId:2_WbM9Pju_SOWws1jhpZZ) guide with these users to help them get up and running with Ashby.

Limited Access users cannot add reports or dashboards to their home page.

### Elevated Access

Elevated Access is the middle-tier permission option. These users can see candidate profiles, jobs, sequences, and reports for the teams, locations and/or jobs to which they have been granted access.&#x20;

When assigning a user Elevated Access and an access role to the job, you will be able to see further details about the job you’re assigning (such as the job requisition ID and the location assigned to the job). This can help ensure the user gets access to the correct role if you have multiple jobs with the same name.

The following access roles can be assigned to those with Elevated Access:

- Hiring Team Member (HTM in the grid below): This user has access to view candidate profiles, along with email communication and any feedback. This role is for users who need access to more candidate information than the details listed in an interview briefing but who won’t be reviewing applications or scheduling interviews. Those with hiring team member access will not be able to email or schedule interviews for candidates.
- Hiring Manager (HM in the grid below): This user has access to view candidate profiles, review applications and contact and edit the candidate. This is likely a user who is managing the candidate pipeline for a specific role or department (scheduling interviews, archiving candidates based on feedback, etc).
- Admin: This is a user who has all the access to manage a pipeline but they can also create new roles and submit feedback on behalf of other users. This is likely a user who oversees pipelines and can set up new roles but who isn’t involved in the offer process.
- Admin - Private (Private in the grid below): A user who needs the above permissions but also access to generate and edit offers and view any private notes or fields (like salary expectations or other sensitive information). This user also has access to view hired candidates.
- Analyst: A user who should only be able to view candidate profiles and email communication, used a lot for users generating reports on specific roles.
- External Recruiter: This is a role assigned for users who are a part of an agency. You can read more about setting up agency users at [**Agencies Setup**](docId\:HPRDN81J0nbGGnh4s-JE1) .
- Quality of Hire (QoH in the grid below): This is a role for users who need access to Quality of Hire survey data, either for specific departments and jobs, or for the entire organization (more on this at [**Quality of Hire Surveys**](docId:8HGJn7fBdlsBnk1fK-2Db)).
- No Access: This role can be added to an employee profile if the user is an Organization Admin or has an Elevated Access role across the organization and you’d like them to not have  access to a certain job or department.

The grid below outlines the actions these users can take on candidate profiles and jobs. This permission set is best suited for your users who log into Ashby to view and take action on candidate profiles and jobs, but shouldn’t have access to change global admin permissions like Hiring Managers, Sourcers, and Recruiting Coordinators.&#x20;

Share the [**Getting Started for Hiring Managers**](docId\:Ku4nmt5UeOs8wfRgFxQNY) or [**Getting Started for Recruiting Coordinators**](docId\:ZHSO6kJXpXFsZbESO2rLl) guides with new elevated access users to help them get up and running with Ashby.

:::hint{type="info"}
Keep in mind that you can assign multiple access roles to a single user. For example, you can grant someone Hiring Manager access to the Marketing team and grant them Analyst access for the entire organization.

Elevated Access users can also be granted a limited set of Admin permissions. You can read more on this at [**Additional User Permissions**](docId\:MHy0TXb4sxnqYe9XKvN8e)&#x20;
:::

### Elevated Access - Access Roles Grid

:::hint{type="info"}
Please note that these are the default permissions settings for access roles in Ashby. If access roles have been amended via the [**Manage Access Roles**](docId\:be1Gtv2R0jGx_Do5mdNR_) tool, please review your active access roles at Admin > Organization Settings > [**Access Roles**](https://app.ashbyhq.com/admin/permissions/access-roles), or reach out to an organization admin for assistance.
:::

| Permissions                                                       | QoH  | External Recruiter  | Analyst  | HTM | HM  | Admin  | Private  |
| ----------------------------------------------------------------- | ---- | ------------------- | -------- | --- | --- | ------ | -------- |
| Can see candidate profiles                                        |      |  ✅                  |  ✅       |  ✅  |  ✅  |  ✅     |  ✅       |
| Can see notes                                                     |      |                     |  ✅       |  ✅  |  ✅  |  ✅     |  ✅       |
| Can see email communication                                       |      |                     |  ✅       |  ✅  |  ✅  |  ✅     |  ✅       |
| Can see feedback forms                                            |      |                     |          |  ✅  |  ✅  |  ✅     |  ✅       |
| Can review applications                                           |      |                     |          |     |  ✅  |  ✅     |  ✅       |
| Can email/schedule candidates\*                                   |      |                     |          |     |  ✅  |  ✅     |  ✅       |
| Can add/edit candidates                                           |      |                     |          |     |  ✅  |  ✅     |  ✅       |
| Can access/use the Chrome extension                               |      |                     |          |     |  ✅  |  ✅     |  ✅       |
| Can add/edit jobs                                                 |      |                     |          |     |     |  ✅     |  ✅       |
| Can submit feedback on behalf of others                           |      |                     |          |     |     |  ✅     |  ✅       |
| Can see/edit hired candidates                                     |      |                     |          |     |     |        |  ✅       |
| Can see private notes/fields\*\*                                  |      |                     |          |     |     |        |  ✅       |
| Can make one-off edits to approval processes (if enabled) \*\*\*  |      |                     |          |     |     |        |  ✅       |
| Can see Quality of Hire details                                   |  ✅   |                     |          |     |     |        |          |

\* Emailing and scheduling are done using the Google Workspace or Microsoft 365 Integrations. This means users must be a part of your domain to take these actions.

\*\* Private notes/fields permissions allow access to private fields, data exports, candidate experience survey submissions and results, offers and files marked as private.

\*\*\*For more information on enabling the option to allow one-off amendments to approval processes, check out [**Approvals**](docId\:e-YBlrBjIGpkXpXJELyJo).

:::hint{type="warning"}
Elevated access users will be able to view candidates who have not been considered for a job yet. Once that candidate is considered for a role, if the role isn’t a job the user has access to, they’ll no longer be able to see that candidate within Candidate Search or in projects the candidate has been added to.
:::

### Organization Admin&#x20;

:::hint{type="warning"}
In most cases, Organizations Admins should not be assigned Job/Team Access roles, as they limit the features they have access to. If you include job or team access roles, the user’s permissions for the specific job(s) or team(s) will be scoped down as shown in the Elevated Access chart above.
:::

Organization Admin is the most permissive option. These users can see and edit candidate profiles, jobs, sequences, reports for all candidates and jobs, and merge candidate profiles. They can also make changes in the [**Admin**](https://app.ashbyhq.com/admin/users) section and to feedback/notes added by other users.

This permission set is best suited for users charged with configuring your team’s Ashby account like Recruiting Team Members and Co-Founders.

Limitations for Organization Admins include:

- If their candidate profile is linked to their employee profile, they can’t see their own info.
- They can not see confidential jobs unless explicitly granted access to them by the person that created the job, or by being given access to all confidential roles using the `Has access to all confidential jobs and projects within assigned permissions` option within the Permissions tab of their profile
- If an Organization Admin has specific permissions set for a role or team, the actions they can take for that role or team will be limited by the scoped-down permissions. Refer to the chart above for details on what is allowed for those permission levels. If those scoped-down permissions should not be applied, they can be removed by another Organization Admin.

:::hint{type="info"}
These users should review [**Ashby Admin Onboarding**](docId\:aSKvbp-DfF9riogKAZshI) and [**Getting Started for Recruiters**](docId\:QyoLopAyBDwsEm-GsXjy3) to get up and running with Ashby.
:::

## Setting up permissions

When the Google Workspace or Microsoft 365 Integration is set up with user syncing, your team members will automatically be provisioned and de-provisioned in Ashby.&#x20;

The default permission option granted to users is Limited Access, which should cover most users. For users that need more permissive roles, navigate to Admin > Organization Setup > [**Employees**](https://app.ashbyhq.com/admin/users), then search for their name in the employee list or by using the search field. Click on the Permissions tab, then select their Global User Role from the dropdown menu. If you select Elevated Access, you must also add at least one team or job access role for that user to be able to view jobs and candidates considered for those jobs.

::loom[]{url="https://www.loom.com/embed/6fb7415bd3dd4d70b5bbde63b8370044"}

### Visibility Options

For more on additional visibility options, check out [**Visibility Options for Users**](docId:_B9z1LwPzNHyQfkpdv9wV).

### Custom Permission Roles

Custom Permission Roles allow you to create new roles alongside those listed above for Elevated Access users, determining the access levels that best suit your needs if those available by default aren’t suitable. You can also amend the existing access roles to adjust access as needed.
For more on this, check out [**Manage Access Roles**](docId\:be1Gtv2R0jGx_Do5mdNR_).

## Viewing Employee Permission History

You can view a log of any changes to an employees permissions within their employee profile. Navigate to Admin > Organization Setup > Employees, then click on the user profile in question.

Navigate to the History tab. From here, you’ll be able to see any changes made to the user’s permissions, along with who made the change and a timestamp showing when the change was made.

Changes that are logged include:

- User being activated, deactivated or terminated
- Changes to their global access role
- Access roles being granted, including the jobs or department the access role has been provided for
- Access roles being revoked.

![](https://cdn.zappy.app/3bb88c6ec2953c47c4de8b019054c349.png)

## Viewing when a user was last active

### Employees Page

::::VerticalSplit{layout="middle"}
:::VerticalSplitItem
You can now add a Last Active Date? column on the Employees page. This will show the last date a user logged in to Ashby. Click the column icon and toggle on the `Last Active Date?` option to add it to the Employee view.


:::

:::VerticalSplitItem
::Image[]{src="https://cdn.zappy.app/b4ff0d0d5d62c5bc96ba5c72759ed9b4.png" signedSrc size="78" width="287" height="271" position="center" caption darkWidth="287" darkHeight="271"}

![](https://cdn.zappy.app/41c0e780d1999b62a347433b2e608226.png)


:::
::::



### Reporting on user activity

This is also available as a field for reporting and filtering, so you can view active employees by their last active date or create other reports focussed around user activity.

Here’s an example of a report grouping users with paid/free seats by their last active date:

- Report Type: Count Over Time
- Subject: Employees
- Timeframe Timestamp: Last Active Date
- Group By: Required Paid Seat?

![](https://cdn.zappy.app/19e236bfe08af0cc572ae32b39a941ed.png)

:::hint{type="info"}
Want to learn more? Check out the [**User Permissions**](https://academy.ashbyhq.com/course/permissions) course in Ashby Academy!
:::

## FAQ

:::ExpandableHeading
### What is the difference between the Hiring Team on a job and Permissions?

The hiring team on a role describes a person’s relationship to the role and enables notifications for the role. The hiring team is managed on the job’s Settings page.
Being on the Hiring Team does not grant a user permission to take action on the role, so if a user is set as a Hiring Manager within the hiring team, they will need to have permissions added to access and take action on candidates and within the job itself.&#x20;
Permissions are managed on a user's employee profile and determine their access.
:::

:::ExpandableHeading
### What does following a job do?

If you opt to follow a job by clicking `More` and then `Follow this job` within the job, in addition to receiving notifications about the job/candidate, following will cause the job and/or job considerations for the job to be included in the results when using the 'Involves' filter.
:::

:::ExpandableHeading
### Can I edit feedback submitted by someone else?

Organization Admins can edit feedback submitted by other users.&#x20;

To edit feedback left by another user:

- Navigate to the candidate profile in question and locate the feedback left within their feed
- Click `More` and then `Edit` on the feedback you'd like to amend
- Add in your amendments, then click `Submit` to confirm your changes.


:::

:::ExpandableHeading
### Can I update employees’ permissions in bulk?

Not yet, but this is on the roadmap. Keep an eye on our change logs for updates!
:::

:::ExpandableHeading
### I’m an Organization Admin, why can’t I access this data?

The culprit is likely that your account has job/team access roles assigned. In most cases, Organizations Admins should not be assigned Job/Team Access roles, as they limit the features they have access to. If you run into this, ask another Organization Admin to remove those roles from your profile.
:::

:::ExpandableHeading
### What permissions are necessary to be able to use the Chrome extension?

Users need at least *Elevated Access -&#x20;*&#x48;iring Manager permissions to source with the Chrome extension.
:::

:::ExpandableHeading
### What happens to user permissions when I delete a team or department the user has access to?

When you archive a team or department, then choose to delete it completely, any users or agencies with access to that department will be highlighted in the Delete Team pop-up.
From there, you can select another team to assign user permissions to. If they shouldn’t have permission to access another team, you can keep the drop-down set to No Team to remove the permissions for that user.

![](https://cdn.zappy.app/27896c108ddca5f1696a91bcad13424b.png)
:::

:::ExpandableHeading
### What is the External Recruiter access role and what access does this provide?

The External Recruiter role is intended for agency users. Those with External Recruiter access will only be able to view the candidates they add to a job, or candidates that their agency are listed as the source on.
We’d recommend checking out our [**Agencies Setup**](docId\:HPRDN81J0nbGGnh4s-JE1)  guides and setting up an agency if you’d like to provide agency users with access. These users will also be able to add candidates to the jobs they have access to.
:::

:::ExpandableHeading
### What is the Quality of Hire access role and what access does this role provide?

The Quality of Hire access role is for those who need access to data from Quality of Hire surveys, either for specific departments and jobs, or for the entire organization (more on this at [**Quality of Hire Surveys**](docId:8HGJn7fBdlsBnk1fK-2Db)). Please note that adding Quality of Hire access role will not restrict the account permissions to just viewing Quality of Hire surveys and will act in addition to existing permissions in Ashby.

Those who have surveys assigned to them (the hiring manager, for example), will be able to see the data from the surveys they’ve been assigned to without needing this access.
:::

:::ExpandableHeading
### What permissions does a user need to view Candidate Experience Survey responses?

Organization Admin or Elevated Access users with an Admin Private role can view Candidate Experience Survey responses, either on a candidate's profile, or at Reports > Candidate Experience Surveys.
:::

:::ExpandableHeading
### What permission level do I need to change a candidate’s stage or archive their job consideration?

To change the stage the candidate’s job consideration is in or archive their job consideration, you would need to have Elevated Access - Hiring Manager access or higher to the job, team, or location.
:::

:::ExpandableHeading
### What permission level do I need to add a note to a candidate profile?

A user would need to have Elevated Access - Hiring Manager access or higher to the job, team or location to have the option to leave notes on a candidate profile.
:::

:::ExpandableHeading
### Can I assign permissions based on location?

If you have users who should have access to jobs in a specific location, you can now use location-based access roles to assign as needed. Location-based access roles are assigned within the Permissions tab of a user’s profile.

![](https://cdn.zappy.app/3856d2759f7020b736b9618fd91984db.png)

In this case, if a job is both in the Engineering team and the location on the job is set to North America, the role with the more restrictive permissions should apply (so in this example, the user would have Hiring Team Member access to the engineering role based in North America). To override this, you could set an additional access role that applies specifically to roles both in the Engineering team in New York and provide that more permissive access role there.

![](https://cdn.zappy.app/e93771bd4011b4970c9083617f5f06fb.png)

**What if the roles overlap?**

In some cases, permissions may overlap. See the example below;

![](https://cdn.zappy.app/a838795678e0e076d2d62243a5217cc0.png)

So this user has Admin level access to roles that have their location set to San Francisco and are in the Product Engineering sub-team. They also have Admin Private access to the Product Engineering roles that have their location set to London and the HR roles based in Europe.

![](https://cdn.zappy.app/3856d2759f7020b736b9618fd91984db.png)
:::

:::ExpandableHeading
### Who can see the details of a candidate’s offer?

Only Organization Admins and those with Elevated Access - Admin Private access can view offer details.
:::

:::ExpandableHeading
### Can I view the details of any changes that were made to user permissions?

Yes, you can view any changes that were made to a specific user’s permissions by heading to their profile within the Employees page and clicking on the History tab. You'll see a timestamp, an indication of who made the change, and a description of the change.

![](https://cdn.zappy.app/aa8d55cc13f6474da4304578a3e9de5c.png)
:::

:::ExpandableHeading
### Can a user see information about their own interview/hiring process in a report?

Users won’t be able to see themselves or data about their own journey in the hiring process in reports if their Ashby profile is linked to their employee profile (more on this at [**Visibility Options for Users**](docId:_B9z1LwPzNHyQfkpdv9wV)). This can result in newly added users seeing slightly different data from other users when viewing reports (for example, one less hire listed in their hire reports, as they would be included as a hire but have their candidate data hidden from them).
:::

:::ExpandableHeading
### Can I set another user’s notification preferences?

No, users can only set their own notification preferences within their personal settings.
:::

:::ExpandableHeading
### Can I give a user access to a single candidate's profile?

It isn’t currently possible to give an employee access to one specific candidate profile. Access roles are only granted on a job, job department and/or job location basis.
:::

:::ExpandableHeading
### Can I edit my own permissions?

No, please reach out to an Organization Admin to have your permissions amended.
:::

:::ExpandableHeading
### How do permissions work with Openings?

For more on the roles that can open and link openings to jobs, check out the [**Openings Management guide**](docId\:KsXxWI1zugAw8lRp8jwXZ).


:::

:::ExpandableHeading
### Ca**n I switch an agency user to be an employee user instead, so I can assign them different permissions?**

You can, yes. This is usually used when you’d like to provide an agency user with additional access to certain roles (for example, the ability to schedule candidates and view all candidates considered for the role).

- Head to Admin > Organization Setup > Agencies
- Select the agency and the agency user in question. Head to the Permissions tab on the user’s profile.
- In the Agency drop-down, click the x beside the agency name. This will remove the link between the user and the agency.
- The user will automatically be given the Limited Access access role. If you’d like to provide them with a specific access role to a job or department, set them to have Elevated Access, the determine the level of access they should have and the roles, departments or locations they should have access to. More on this at Ashby Permissions.

::Image[]{src="https://cdn.zappy.app/a3570f37f8c08042f5bda2f6572839fd.png" signedSrc="https://cdn.zappy.app/a3570f37f8c08042f5bda2f6572839fd.png" size="100" caption alt isUploading="false" width="805" height="297" darkWidth="805" darkHeight="297" indent="2"}

If you’d like to switch an employee user to be an agency user, use the *Agency* dropdown on the user’s profile to select an agency and assign it to the user.

::Image[]{src="https://cdn.zappy.app/56c6af278f69976be5ef68a68558a45c.png" signedSrc="https://cdn.zappy.app/56c6af278f69976be5ef68a68558a45c.png" size="100" caption alt isUploading="false" width="805" height="638" darkWidth="805" darkHeight="638" indent="2"}
:::
