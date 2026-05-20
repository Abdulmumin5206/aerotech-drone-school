# AI Prompt — Drone School Website Architecture Update

## Context

We are updating the current Air Technologies / CFYI drone website gradually.

The website should eventually represent the full business architecture:

- Drone School
- Commercial Drone Services
- Partnerships / Drone Ecosystem

However, for this first update, focus **only on the Drone School part**.

Do not redesign the entire website yet.  
Do not remove existing homepage sections unless absolutely necessary.  
This is a gradual architecture migration.

---

## Main Goal of This Update

Create a dedicated **Drone School** page and connect it properly from the homepage and header navigation.

The homepage can still keep existing education-related content for now, but it should start guiding users toward the new Drone School page.

The Drone School page should become the main place where all educational programs are explained clearly and professionally.

---

## Strategic Website Decision

The main website should stay general.

The homepage should introduce Air Technologies / CFYI as a drone education, pilot training, and UAV technology platform.

The detailed education content should move into a dedicated page:

```text
/drone-school
```

The homepage should include a short Drone School teaser section with a button:

```text
Explore Drone School
```

The header navigation should also include:

```text
Drone School
```

If dropdown navigation is easy to implement, use this:

```text
Drone School
├── Drone Programming
├── Drone Building
├── Pilot Training
└── For Schools & Universities
```

If dropdown navigation is not already supported, use only one link for now:

```text
Drone School → /drone-school
```

---

## Page to Create

Create a new page:

```text
/drone-school
```

This page should explain the Drone School clearly.

Suggested page title:

```text
Drone School
```

Suggested hero headline:

```text
Learn, build, and operate drones with real hands-on training.
```

Suggested hero subtext:

```text
Air Technologies — CFYI helps students, beginners, and future professionals learn drone programming, drone engineering, and official pilot operation through practical training.
```

Primary CTA:

```text
Choose Your Program
```

Secondary CTA:

```text
Contact Us
```

---

## Drone School Page Structure

The page should have these sections in this order:

---

## 1. Hero Section

Purpose: Explain what Drone School is in one clear message.

Content direction:

- Drone education
- Programming
- Building
- Pilot training
- Practical hands-on learning
- For students, beginners, professionals, and institutions

Example copy:

```text
Drone School is a practical learning platform where students and future professionals learn how drones work, how they are programmed, how they are built, and how they are operated safely and legally.
```

---

## 2. Program Overview Section

Title:

```text
Choose your drone learning path
```

Create three main program cards:

### Card 1 — Drone Programming

Website-friendly name:

```text
Drone Programming
```

Short description:

```text
Learn drone basics, visual programming, Python missions, and autonomous drone projects using DJI Tello drones.
```

Tags / small highlights:

```text
Age 12+
DJI Tello
Programming
Indoor missions
```

Button:

```text
View Program
```

Button can scroll to the Drone Programming section on the same page:

```text
#drone-programming
```

---

### Card 2 — Drone Building

Website-friendly name:

```text
Drone Building
```

Short description:

```text
Design, fabricate, assemble, and test a real engineering drone using FabLab tools and practical electronics.
```

Tags / small highlights:

```text
FabLab
Engineering
Fabrication
Hands-on assembly
```

Button:

```text
View Program
```

Button can scroll to:

```text
#drone-building
```

---

### Card 3 — Pilot Training

Website-friendly name:

```text
Official Drone Pilot Training
```

Short description:

```text
Training for adults who want to become legal and professional drone pilots/operators in Uzbekistan.
```

Tags / small highlights:

```text
18+
Flight safety
Regulations
Practical operation
```

Button:

```text
View Program
```

Button can scroll to:

```text
#pilot-training
```

---

## 3. Drone Programming Section

Section ID:

```text
drone-programming
```

Title:

```text
Drone Programming with DJI Tello
```

Better marketing subtitle:

```text
From first flight commands to autonomous drone missions.
```

Description:

```text
This pathway introduces students to drones through safe indoor flight, visual programming, Python, mission planning, and autonomous drone projects using DJI Tello drones.
```

Important notes:

- DJI Tello is mainly suitable for indoor learning.
- Outdoor use can be limited and should not be the main promise.
- This is the easiest entry point for young learners and beginners.

Create three levels:

### Level 1 — Drone Basics & Visual Programming

Description:

```text
Students learn drone safety, basic flight logic, movement commands, and simple visual programming.
```

Learning points:

- What is a drone?
- Drone safety
- Takeoff and landing
- Basic movement
- Visual / Scratch-style programming
- Simple command sequences

Outcome:

```text
Students can safely control a drone and create simple programmed movements.
```

---

### Level 2 — Python Drone Missions

Description:

```text
Students move from visual logic to Python and learn how to create planned drone missions.
```

Learning points:

- Python basics
- Drone control with code
- Variables
- Loops
- Conditions
- Functions
- Mission planning
- Debugging drone behavior

Outcome:

```text
Students can write Python code to control drone missions.
```

---

### Level 3 — Autonomous Drone Projects

Description:

```text
Students create more advanced drone projects using mission logic, camera concepts, and autonomous behavior.
```

Learning points:

- Advanced mission logic
- Multi-step missions
- Camera/video stream basics
- Introduction to computer vision
- Object tracking concepts
- Final autonomous project
- Swarm / multi-drone concepts if equipment allows

Outcome:

```text
Students can create a small autonomous drone project.
```

---

## 4. Drone Building Section

Section ID:

```text
drone-building
```

Title:

```text
Drone Building with FabLab
```

Subtitle:

```text
Learn how drones are designed, manufactured, assembled, and tested.
```

Description:

```text
This course gives students practical engineering experience by teaching them how drone components work together and how to build a real drone using FabLab tools.
```

Important: This is one course, not multiple levels.

Learning points:

- Drone components
- Frame / chassis design
- CAD basics
- Materials and manufacturing
- 3D printing / fabrication
- Motors and propellers
- ESCs, batteries, and power system
- Flight controller basics
- Wiring and assembly
- Calibration basics
- Testing and troubleshooting
- Safety checks

Target audience:

- Students interested in engineering
- Makers
- University students
- Technical school students
- Engineering faculties
- Young people interested in manufacturing and robotics

Outcome:

```text
Students understand how drones are built and gain hands-on engineering experience by assembling and testing a drone.
```

---

## 5. Official Drone Pilot Training Section

Section ID:

```text
pilot-training
```

Title:

```text
Official Drone Pilot Training
```

Subtitle:

```text
For adults preparing for legal and professional drone operation.
```

Description:

```text
This training is designed for adults who want to become professional drone pilots/operators and understand drone regulations, safety, mission planning, and practical flight operations.
```

Target audience:

- 18+
- Future drone pilots
- Professionals
- Entrepreneurs
- Company employees
- People who want legal/commercial drone work
- Organizations that need trained drone operators

Training topics:

- Drone regulations
- Airspace awareness
- Flight safety
- Operator responsibility
- Pre-flight checklist
- Practical flight training
- Emergency procedures
- Mission planning
- Weather and environment awareness
- Risk assessment
- Final assessment / certification process

Outcome:

```text
Learners gain the knowledge and practical skills needed for safe and professional drone operation.
```

Important wording rule:

Use confident wording because the site is planned to launch when the required authority/license is ready.  
However, avoid making unrealistic promises like “guaranteed certification.”

---

## 6. For Schools & Universities Section

Section ID:

```text
education-partners
```

Title:

```text
For Schools, Universities, and Education Partners
```

Description:

```text
Air Technologies — CFYI can provide drone programming workshops, drone building programs, pilot training pathways, and custom drone education programs for institutions.
```

Offer types:

- Drone programming workshops
- Drone building workshops
- Short bootcamps
- Semester programs
- University collaboration programs
- Custom curriculum for institutions

CTA:

```text
Discuss Partnership
```

---

## 7. Final CTA Section

Title:

```text
Ready to start learning drones?
```

Text:

```text
Choose a program or contact our team to discuss the right drone training path for students, professionals, or your organization.
```

Buttons:

```text
Contact Us
Explore Programs
```

---

## Homepage Changes

Do not fully redesign the homepage yet.

Make only these changes:

### 1. Header Navigation

Add:

```text
Drone School
```

Link it to:

```text
/drone-school
```

If dropdown is supported, add:

```text
Drone School
├── Drone Programming
├── Drone Building
├── Pilot Training
└── For Schools & Universities
```

The dropdown items can link to sections on the Drone School page:

```text
/drone-school#drone-programming
/drone-school#drone-building
/drone-school#pilot-training
/drone-school#education-partners
```

### 2. Homepage Drone School Teaser

Add or update a section on the homepage:

Title:

```text
Drone School
```

Headline:

```text
Practical drone education for students and future professionals.
```

Description:

```text
Learn drone programming with DJI Tello, build drones with FabLab, or prepare for professional drone pilot operation through hands-on training.
```

Cards:

- Drone Programming
- Drone Building
- Official Pilot Training

Button:

```text
Explore Drone School
```

Link:

```text
/drone-school
```

---

## Design Requirements

Keep the existing website style if possible.

The design should feel:

- Professional
- Clean
- Modern
- Educational
- Technology-focused
- Trustworthy for parents and institutions

Avoid:

- Too much text in cards
- Overpromising
- Mixing commercial drone services into the Drone School page
- Making the homepage too crowded
- Using too many unrelated CTAs

---

## Implementation Requirements

1. Create `/drone-school` page.
2. Add header link to `/drone-school`.
3. Add homepage teaser section linking to `/drone-school`.
4. Keep existing homepage content for now.
5. Use anchor links for page sections.
6. Make layout responsive for mobile and desktop.
7. Use consistent spacing and typography.
8. Make program cards clean and easy to scan.
9. Do not create separate pages for each program yet.
10. Do not work on Drone Services or Partnerships pages in this step.

---

## Current Scope

Only this first step:

```text
Create the Drone School page and connect it from homepage/header.
```

Do not implement:

- Commercial Drone Services page
- Partnerships page
- Full site redesign
- Payment system
- Course registration system
- CMS
- Complex animations
- Separate course detail pages

---

## Expected Result

After this update, the website should clearly show:

1. Air Technologies has a Drone School.
2. Drone School has three main programs:
   - Drone Programming
   - Drone Building
   - Official Drone Pilot Training
3. Drone Programming has three levels:
   - Drone Basics & Visual Programming
   - Python Drone Missions
   - Autonomous Drone Projects
4. Drone Building is one complete FabLab-based course.
5. Pilot Training is for 18+ professional/legal drone operation.
6. Schools and universities can partner with Air Technologies.
7. Homepage still works, but now guides users to the dedicated Drone School page.
