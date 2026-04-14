[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23551353)
# CSSE6400 Week 6 Practical

Deploying our TaskOverflow application to ECS with a load balancer on AWS using Terraform.

Please see the [instructions](https://csse6400.uqcloud.net/practicals/week06.pdf) for more details.

## Files

- `main.tf`: shared provider, locals, and data sources
- `db.tf`: PostgreSQL RDS instance and database security group
- `ecs.tf`: ECS cluster, task definition, service, and application security group
- `lb.tf`: application load balancer, target group, listener, and DNS output
- `autoscaling.tf`: ECS autoscaling target and CPU scaling policy
- `k6.js`: load testing script for generating traffic

## Setup

1. Start the AWS Learner Lab.
2. Copy the Learner Lab credentials into a file named `credentials` in the repository root.
3. Initialise Terraform:

```bash
terraform init
```

4. Review the plan:

```bash
terraform plan
```

5. Deploy the infrastructure:

```bash
terraform apply
```

6. Retrieve the load balancer DNS name:

```bash
terraform output taskoverflow_dns_name
```

## Load Testing

Install `k6`, then run the provided script against the deployed service:

```bash
TASKOVERFLOW_URL=http://$(terraform output -raw taskoverflow_dns_name) k6 run k6.js
```

This sends sustained traffic to `/api/v1/todos` so ECS autoscaling activity can be observed in the AWS console.
