Gods of Trondheim meta website

## Project Structure
In the root folder, we have index.html. This file is a landing page. It contains links to each of our group's sites.

Each individual site has its own folder, named after your religion.
Here you put your own site.
We use HTML, CSS, Javascript/Typescript or some other javascript framework like React.
That makes it easy to link our sites together.
Look at occultism if you need an example.

## Read this if you have not worked with git before 
All this can seem a bit much. If it is, just email your files to markase@ntnu.no and we will make it work.

We use git to share the code that we write. It is hosted here in our repository on github.
This makes it so all our code will be collected in one place.
Git allows us to upload and make changes to our individual pieces of code whenever we want.

We can:
- Pull other's code (download it).
- Commit our code (upload it).
- Have a personal branch that we work on to only have our changes. (Not really needed, since everyone has their own folder). 

## 1. Setting Up

### Create a GitHub account

Go to [github.com](https://github.com) and sign up.

### Install Git

Use a terminal. The one in VS code is good.

- **macOS:** `brew install git` (uses homebrew)
- **Windows:** Download from [git-scm.com](https://git-scm.com/downloads)

Verify it works in a terminal:
The following are terminal commands.

```bash
git --version
```

### Configure your identity

Git attaches your name and email to every commit you make:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use the same email you registered on GitHub so your commits are linked to your profile.

### Set up SSH 

SSH keys let you push and pull code.

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Press Enter to accept the default file location. Add a passphrase if you like. Then copy your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Go to **GitHub → Settings → SSH and GPG keys → New SSH key**, paste the key, and save.

Test the connection:

```bash
ssh -T git@github.com
```

You should see a message like "Hi username! You've successfully authenticated."

---

# How to Upload Your Code to This Repository
### Clone this repository

This downloads the repo to your computer:

```bash
git clone git@github.com:MarkusServan/gods-of-trondheim.git
```

Move into the folder:

```bash
cd gods-of-trondheim
```
---

## Uploading Your Code

Once the setup above is done, this is what you'll do each time.

### 1. Make sure you're up to date

Before adding anything, pull the latest changes so you're not working on an outdated version:

```bash
git pull
```

### 2. Create a branch for your work

Don't work directly on `main`. Create your own branch:

```bash
git checkout -b your-religion
```

For example: `git checkout -b hinduism`

### 3. Add your files

Copy or move your code files into the repository folder on your computer. Put them wherever the project structure requires.

### 4. Check what Git sees

```bash
git status
```

Your new and changed files should show up in red under "Untracked files" or "Changes not staged for commit."

### 5. Stage your files

Tell Git which files to include:

```bash
git add .
```

This stages everything. Run `git status` again — your files should now appear in green.

### 6. Commit

Save a snapshot with a message describing what you added:

```bash
git commit -m "Add descirption of nattverden"
```

Keep the message short and descriptive.

### 7. Push to GitHub

```bash
git push
```
---
It will say that you need to set the upstream branch to remote. 
Copy and paste the command that it shows you.
You only need to do this the first time.

---
### 8. Merge to main branch
The main branch will be all our branches combined.
To merge your branch to the main branch:
Go to the main branch
```bash
git checkout main
```
Merge your branch with main. 
If you forgot the name of your branch or whatever, write this to show all branches.
```bash
git branch -a
```
Then merge your branch into main. Substitute you-religion with the name of your branch.
```bash
git merge your-religion
```

## Common Issues

**"Permission denied (publickey)"** — Your SSH key isn't set up correctly. Revisit the SSH section above and make sure the key is added to your GitHub account.

**"Updates were rejected because the remote contains work that you do not have locally"** — Someone else pushed changes. Run `git pull` first, then try pushing again.

**"You are in 'detached HEAD' state"** — You're not on a branch. Run `git checkout -b your-name/description` to create one.

**"fatal: not a git repository"** — You're not inside the repo folder. Make sure you `cd` into the cloned folder first.

